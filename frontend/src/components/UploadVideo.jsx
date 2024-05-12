import React, { useState } from "react";

const UploadVideo = ({title, onVideoUpload}) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    setSelectedVideo(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setSelectedVideo(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleUpload = () => {
    // Perform upload logic here
    if (selectedVideo) {
      console.log(selectedVideo, selectedVideo);
      const formData = new FormData();
      formData.append("file", selectedVideo);
      console.log(formData);

      // Example: Send formData to the backend using fetch
      fetch("http://127.0.0.1:8000/process_video", {
        method: "POST",
        headers: {
          accept: "application/json",
        },
        body: formData,
      })
        .then((response) => response.blob())
        .then((videoBlob) => {
          const blobUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(blobUrl);
          onVideoUpload(blobUrl);
          console.log("Upload successful:", data);
        })
        .catch((error) => {
          console.error("Error uploading video:", error.message);
        });
    }
  };
  return (
    <div className="max-w-md mx-auto pt-8 flex flex-col">
      <h1 className="text-3xl font-semibold  text-white mb-4 text-center">
        {title}
      </h1>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className='border-2 border-dashed border-gray-300 p-8 rounded-md text-center cursor-pointer'
      >
        <p className='text-gray-600'>
          Drag and drop a video file here, or click to select one.
        </p>
        <input
          type='file'
          accept='video/*'
          onChange={handleVideoChange}
          className='hidden'
        />
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Select Video
        </button>
      </div>
      {selectedVideo && (
        <div className="mt-4">
          <p className="text-green-700">Selected Video: {selectedVideo.name}</p>
          <button
            onClick={handleUpload}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Upload Video
          </button>
        </div>
      )}

      {videoUrl && (
        <div className="mt-4">
          <video
            controls
            width='100%'
            height='auto'
            onPlay={() => console.log("Video is playing")}
            onPause={() => console.log("Video is paused")}
          >
            <source
              src={videoUrl}
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default UploadVideo;
