// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const WebSocketComponent = () => {
//   const [notification, setNotification] = useState("");

//   useEffect(() => {
//     const socket = new WebSocket("ws://localhost:8000/ws");

//     socket.onmessage = (event) => {
//       setNotification(event.data);
//     };

//     return () => {
//       socket.close();
//     };
//   }, []);

//   return (
//     <div>
//       {notification && <p>New data added: {notification}</p>}
//     </div>
//   );
// };

// export default WebSocketComponent;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const PollingComponent = () => {
//     const [notifications, setNotifications] = useState([]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             fetchData();
//         }, 5000); // Polling interval: 5 seconds

//         // Fetch data initially when component mounts
//         fetchData();

//         return () => clearInterval(interval);
//     }, []);

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://localhost:8000/poacher_data');
//             const newNotifications = response.data;
//             if (newNotifications.length > 0) {
//                 setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
//             }
//         } catch (error) {
//             console.error('Error fetching new data:', error);
//         }
//     };

//     return (
//         <div style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '1000' }}>
//             {notifications.length > 0 ? (
//                 notifications.map(notification => (
//                     <div key={notification.id} style={notificationStyle}>
//                         <p style={titleStyle}>{notification.title}</p>
//                         <p style={messageStyle}>{notification.message}</p>
//                     </div>
//                 ))
//             ) : (
//                 <p>No new notifications</p>
//             )}
//         </div>
//     );
// };

// // Inline styles
// const notificationStyle = {
//     backgroundColor: '#FFFFFF',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//     marginBottom: '10px',
//     padding: '10px 20px',
//     maxWidth: '300px',
//     transition: 'transform 0.3s ease-in-out',
// };

// const titleStyle = {
//     fontWeight: 'bold',
//     marginBottom: '5px',
// };

// const messageStyle = {
//     marginBottom: '0',
// };

// export default PollingComponent;
import React, { useEffect, useState } from "react";
import axios from "axios";

const AlertTable = () => {
  const [poacherImages, setPoacherImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/poacher_images")
      .then(response => {
        if (!response.data || !Array.isArray(response.data.poacher_images)) {
          throw new Error("Invalid data format.");
        }
        setPoacherImages(response.data.poacher_images);
      })
      .catch(error => {
        console.error("Error fetching poacher images:", error);
        setError("Error fetching poacher images. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      {isLoading && <div className="text-center">Loading poacher images...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!isLoading && !error && (
        <div className="space-y-4">
          {poacherImages.length > 0 ? (
            poacherImages.map(poacherImage => (
              <div key={poacherImage.id} className="bg-white p-4 shadow rounded-md">
                <p className="text-lg font-semibold">
                  Attention!!! A suspect has been detected at {poacherImage.timestamp.split('_')[0]} {poacherImage.timestamp.split('_')[1].replace("-", ':')} recorded by cam1.
                </p>
                {/* <img src={poacherImage.image_url} alt={poacherImage.filename} className="mt-2 w-full h-auto" /> */}
              </div>
            ))
          ) : (
            <div className="text-center text-black">No poacher images found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlertTable;
