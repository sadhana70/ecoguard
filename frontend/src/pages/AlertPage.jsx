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

import React from 'react';
import AlertTable from '../components/Alert';

const App = () => {
    return (
        <div>
            <AlertTable />
        </div>
    );
};

export default App;


//   return (
//     <div>
//       {notification && <p>New data added: {notification}</p>}
//     </div>
//   );
// };

// export default WebSocketComponent;
