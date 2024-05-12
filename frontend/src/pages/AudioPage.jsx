// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AudioSuspectTable = () => {
//   const [audio, setAudio] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get("http://localhost:8000/audio_data")
//       .then(response => {
//         if (!response.data || !Array.isArray(response.data.audio_data)) {
//           throw new Error("Invalid data format.");
//         }
//         setAudio(response.data.audio_data);
//         setIsLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching:", error);
//         setError("Error fetching audio. Please try again later.");
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return <div>Loading data...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className='relative overflow-x-auto mr-6'>
//       {audio.length > 0 ? (
//         <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
//           <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
//             <tr>
//               <th scope='col' className='px-6 py-3'>ID</th>
//               <th scope='col' className='px-6 py-3'>Timestamp</th>
//               <th scope='col' className='px-6 py-3'>Camera</th>
//               <th scope='col' className='px-6 py-3'>Audio</th>
//             </tr>
//           </thead>
//           <tbody>
//             {audio.map((audioData, index) => ( 
//               <tr key={index} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
//                 <td className='px-6 py-4'>{index+1}</td>
//                 <td className='px-6 py-4'>{audioData.timestamp.split('_')[0]} {audioData.timestamp.split('_')[1].replace('-', ':').replace('-', ':')}</td>
//                 <td className='px-6 py-4'>{audioData.camera}</td>
//                 <td className='px-6 py-4'>
//                   {/* Assuming there's an audio_url field in your data */}
//                   <audio controls>
//                     <source src={audioData.audio_url} type="audio/wav" />
//                     Your browser does not support the audio element.
//                   </audio>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div>No data found.</div>
//       )}
//     </div>
//   );
// };

// export default AudioSuspectTable;
// import React from "react";
// import TestComponent from "../components/Suspect";
// import SuspectTable from "../components/Suspect";
// import ScreenshotComponent from "../components/ScreenShot";
// import UploadVideo from "../components/UploadVideo";
// import CameraComponent from "../components/CameraAccess";

// function SuspectPage() {
//   return (
//     <div className="pt-5">
//       <div className="mb-1">
//         <h1 className="text-3xl font-semibold text-white  mb-2">Suspects</h1>
//       </div>

//       <SuspectTable />
//       {/* <TestComponent /> */}
//     </div>
//   );
// }

// export default SuspectPage;

import React, { useEffect, useState } from "react";
import axios from "axios";

const AudioDataTable = () => {
  const [audioData, setAudioData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/audio_data")
      .then(response => {
        if (!response.data || !Array.isArray(response.data.audio_data)) {
          throw new Error("Invalid data format.");
        }
        setAudioData(response.data.audio_data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching audio data:", error);
        setError("Error fetching audio data. Please try again later.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading audio data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='relative overflow-x-auto mr-6'>
      {audioData.length > 0 ? (
        <table className='w-full text-sm text-left rtl:text-right text-black dark:text-black'>
          <thead className='text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-white'>
            <tr>
              <th scope='col' className='px-6 py-3'>ID</th>
              <th scope='col' className='px-6 py-3'>Filename</th>
              <th scope='col' className='px-6 py-3'>Timestamp</th>
              <th scope='col' className='px-6 py-3'>Location</th>
              {/* Add more headers if needed */}
            </tr>
          </thead>
          <tbody>
            {audioData.map((audioItem, index) => (
              <tr key={audioItem.id} className='bg-white border-b bg-white dark:border-black'>
                <td className='px-6 py-4'>{index + 1}</td>
                <td className='px-6 py-4'>{audioItem.filename}</td>
                <td className='px-6 py-4'>{audioItem.timestamp}</td>
                <td className='px-6 py-4'>Dhapakhel</td>
                {/* Add more rows based on the data structure */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No audio data found.</div>
      )}
    </div>
  );
};

export default AudioDataTable;
