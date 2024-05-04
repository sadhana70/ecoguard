import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
const CameraComponent = () => {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [isCameraOn, setCameraOn] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    let timer;

    if (isRecording) {
      timer = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRecording]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraOn(true);

        // Create a MediaRecorder to record video
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm",
        });
        mediaRecorderRef.current = mediaRecorder;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const closeCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    setCameraOn(false);
    setRecording(false);
    setRecordedVideo(null);
    setRecordingTime(0);
  };

  const startRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      const recordedChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const recordedVideoURL = URL.createObjectURL(recordedBlob);
        setRecordedVideo(recordedVideoURL);
        setRecordingTime(0);
      };

      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleSubmit = () => {
    Swal.fire({
      title: "Do you want to submit a video?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Submitted!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    setRecordedVideo(null);
  };

  return (
    <div className='max-w-screen-lg mx-auto p-8 bg-gray-800 rounded-lg shadow-lg text-white'>
      <h1 className='text-3xl mb-4'>Camera and Video Recording </h1>
      {isCameraOn ? (
        <>
          <div className='mb-4'>
            <button
              onClick={closeCamera}
              className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2'
            >
              Close Camera
            </button>
            {isRecording ? (
              <button
                onClick={stopRecording}
                className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
              >
                Stop Recording
              </button>
            ) : (
              <button
                onClick={startRecording}
                className='bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600'
              >
                Start Recording
              </button>
            )}
          </div>
        </>
      ) : (
        <button
          onClick={startCamera}
          className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        >
          Start Camera
        </button>
      )}
      <video
        ref={videoRef}
        className='mt-4 border'
        width='100%'
        height='100px'
        autoPlay
        muted
        id='targetElement'
      ></video>
      {isRecording && (
        <div className='mt-4'>
          <p className='text-lg'>Recording Time: {formatTime(recordingTime)}</p>
        </div>
      )}
      {recordedVideo && (
        <div className='mt-4'>
          <h2 className='text-2xl mb-2'>Recorded Video</h2>
          <video
            controls
            className='border'
            width='100%'
            height='100px'
            src={recordedVideo}
            type='video/webm'
          />
          {/* Show the submit button when recording is done */}
          <button
            onClick={handleSubmit}
            className='bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 mt-2'
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraComponent;
