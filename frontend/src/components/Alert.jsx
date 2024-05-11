import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const AlertComponent = () => {
    const [newImageData, setNewImageData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/poacher_images', {
                    responseType: 'arraybuffer', // Ensure binary response for images
                });
                // Set new image data
                setNewImageData(response.data);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (newImageData) {
            // Display SweetAlert2 alert with image
            Swal.fire({
                title: 'New Image Available!',
                html: `<img src="data:image/jpeg;base64,${Buffer.from(newImageData).toString('base64')}" alt="New Image" />`,
                icon: 'info',
                confirmButtonText: 'OK'
            }).then(() => {
                // Reset new image data after showing the alert
                setNewImageData(null);
            });
        }
    }, [newImageData]);

    return (
        <div>
            hello
        </div>
    );
};

export default AlertComponent;
