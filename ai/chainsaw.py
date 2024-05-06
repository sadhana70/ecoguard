import argparse
import os
import shutil
import numpy as np
import librosa
import glob
import multiprocessing
import pyaudio
import wave
from extract_pcen_features import extract_pcen_feature as extract_features
from classify_features import classify_features

def main():
    print("Recording Audio")

    audio = pyaudio.PyAudio()

    record_seconds = 10
    sample_rate = 8000
    buffer_frames = 1024

    stream = audio.open(format=pyaudio.paInt16, channels=1, rate=sample_rate, input=True, frames_per_buffer=buffer_frames)

    frames = []

    for _ in range(0, int(sample_rate / buffer_frames * record_seconds)):
        data = stream.read(buffer_frames)
        frames.append(data)
        print("Listening...")

    stream.stop_stream()
    stream.close()
    audio.terminate()

    directory = os.getcwd()
    sound_file = wave.open(directory + "/audio_file/Recorded Audio.wav", "wb")
    sound_file.setnchannels(1)
    sound_file.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
    sound_file.setframerate(8000)
    sound_file.writeframes(b''.join(frames))
    sound_file.close()

    parser = argparse.ArgumentParser(description='batch_processor', formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('-u', '--nopREQ', type=int, default=6, help='number of processing units employed')
    parser.add_argument('-t', '--VADthresh', type=float, default=0.078, help='Threshold for VAD detection, default=0.078')
    parser.add_argument('-p', '--probThresh', type=float, default=0.75, help='Threshold for RNN classifier, default=0.75')
    args = parser.parse_args()

    max_dur = 400  # in seconds
    nop = multiprocessing.cpu_count()
    nop_rec = np.max([1, nop - 1])
    nop_use = args.nopREQ if args.nopREQ < nop_rec else nop_rec
    VADthresh = args.VADthresh if args.VADthresh >= 0.0779 else 0.078
    prob_thresh = args.probThresh if args.probThresh > 1 else args.probThresh

    input_wav_path = directory + "/audio_file"
    output_data_path = directory + "/audio_file"

    if os.path.exists(input_wav_path + '/' + 'Features'):
        shutil.rmtree((input_wav_path + '/' + 'Features'))

    if os.path.exists(input_wav_path + '/' + 'Extracted_segments'):
        shutil.rmtree((input_wav_path + '/' + 'Extracted_segments'))

    if os.path.exists(input_wav_path + '/' + 'Features') == False:
        os.mkdir((input_wav_path + '/' + 'Features'))

    if os.path.exists(input_wav_path + '/' + 'Extracted_segments') == False:
        os.mkdir((input_wav_path + '/' + 'Extracted_segments'))

    folder_with_recordings = (input_wav_path + '/*.wav')

    for wavName in glob.glob(folder_with_recordings):
        pool = multiprocessing.Pool(nop_use)
        fileDuration = librosa.get_duration(filename=wavName)
        sr = librosa.get_samplerate(wavName)
        if sr == 8000:
            if fileDuration < max_dur:
                timeBorders = np.array((0, fileDuration))
            else:
                timeBorders = np.arange(0, fileDuration, max_dur)
                timeBorders = np.delete(timeBorders, -1, axis=None)
                timeBorders = np.append(timeBorders, fileDuration)

            Nsegm = timeBorders.size

            for segmIdx in range(Nsegm - 1):
                pool.apply_async(extract_features, args=(wavName, output_data_path, timeBorders, segmIdx, VADthresh))

            pool.close()
            pool.join()
        else:
            print(wavName.split(os.sep)[-1] + ' has a sampling rate different than 8000 Hz, will not process this audio file ')

    if classify_features(output_data_path, f"model/teamStartup_chainsaw_model.hdf5", 2, prob_thresh):
        print("Chainsaw Detected!")
    else:
        print("No Chainsaw Detected!")

if __name__ == "__main__":
    main()
