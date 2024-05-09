import librosa
import tensorflow.keras.models as models
import numpy as np
import tensorflow as tf

# Load the model using tf.keras.models.load_model()
new_model = tf.keras.models.load_model('model.h5', compile=False)

class conf:
    sr = 16000
    duration = 3
    hop_length = 340*duration
    fmin = 20
    fmax = sr // 2
    n_mels = 128
    n_fft = n_mels * 20
    samples = sr * duration
    epochs = 30
# new_model = models.load_model('export')
def audio_to_melspectrogram(conf, audio):
    spectrogram = librosa.feature.melspectrogram(y=audio, 
                                                 sr=conf.sr,
                                                 n_mels=conf.n_mels,
                                                 hop_length=conf.hop_length,
                                                 n_fft=conf.n_fft,
                                                 fmin=conf.fmin,
                                                 fmax=conf.fmax)
    spectrogram = librosa.power_to_db(spectrogram)
    return spectrogram


def preprocess(file_path):
    sig, sr = librosa.load(file_path, sr=16000)

    # Define the duration of each clip in seconds
    clip_duration = 2  # 2 seconds

    num_clips = 3

    x_data = []

    # Create random clips from the audio file
    for i in range(num_clips):
        # Generate a random start sample index within the audio signal
        start_sample = np.random.randint(0, len(sig) - sr * clip_duration)
        
        # Extract the clip from the audio signal
        clip = sig[start_sample:start_sample + sr * clip_duration]
        
        # Perform feature extraction (e.g., mel spectrogram)
        mel_spec = audio_to_melspectrogram(conf, clip)
        
        x_data.append(mel_spec)

    x_data = np.array(x_data)
    return x_data




def is_chainsaw(file_path):
    sound_clips = preprocess("download1.wav")
    for clip in sound_clips:
        testing = np.expand_dims(clip, axis=(0, -1))
        pred = new_model.predict(testing)
        if pred[0][1] > 0.09:
            print("chainsaw")
            return True
        else:
            print("no chainsaw")
            return False
            
            
if __name__ == "__main__":
    is_chainsaw("1.wav")