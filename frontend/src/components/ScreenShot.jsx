import React, { useState } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotComponent = () => {
  const [screenshotImage, setScreenshotImage] = useState(null);

  const takeScreenshot = () => {
    const element = document.getElementById('targetElement');

    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL('image/png');
      setScreenshotImage(image);
    });
  };

  return (
    <div>
      <h1>Your Component</h1>
      <div >
        {/* The content you want to capture goes here */}
        <p>This is the content you want to capture in the screenshot.</p>
      </div>
      <button onClick={takeScreenshot}>Take Screenshot</button>

      {screenshotImage && (
        <div>
          <h2>Screenshot:</h2>
          <img src={screenshotImage} alt="Screenshot" />
        </div>
      )}
    </div>
  );
};

export default ScreenshotComponent;
