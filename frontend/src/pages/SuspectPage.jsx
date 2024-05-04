import React from "react";
import SuspectTable from "../components/Suspect";
import ScreenshotComponent from "../components/ScreenShot";
import UploadVideo from "../components/UploadVideo";
import CameraComponent from "../components/CameraAccess";

function SuspectPage() {
  return (
    <div className="pt-5">
      <div className="mb-1">
        <h1 className="text-3xl font-semibold text-white  mb-2">Suspects</h1>
      </div>

      <SuspectTable />
    </div>
  );
}

export default SuspectPage;
