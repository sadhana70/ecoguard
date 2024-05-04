import React from "react";
import CameraComponent from "../components/CameraAccess";
import UploadVideo from "../components/UploadVideo";
import CameraCard from "../components/CameraCard";

function CameraPage() {
  const citiesData = [
    {
      name: "Satdobato",
    },
    {
      name: "Koteshwor",
    },
    {
      name: "Pulchowk",
    },
    {
      name: "Thimi",
    },
  ];
  return (
    <div className='flex justify-center'>
      {citiesData.map((city, index) => (
        <CameraCard
          key={index}
          name={city.name}

        />
      ))}
    </div>
  );
}
export default CameraPage;
