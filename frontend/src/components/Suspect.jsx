import React, { useEffect, useState } from "react";
import axios from "axios";


const SuspectTable = () => {
  const [poacherImages, setPoacherImages] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    // axios.get("/poacher_images")
    axios.get("http://localhost:8000/poacher_images")
      .then(response => {
        if (!response.data || !Array.isArray(response.data.poacher_images)) {
          throw new Error("Invalid data format.");
        }
        setPoacherImages(response.data.poacher_images);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching poacher images:", error);
        setError("Error fetching poacher images. Please try again later.");
        setIsLoading(false);
      });
  }, []);


  if (isLoading) {
    return <div>Loading poacher images...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='relative overflow-x-auto mr-6'>
      {poacherImages.length > 0 ? (
        <table className='w-full text-sm text-left rtl:text-right text-pink-500 dark:text-black rounded-lg overflow-hidden border border-pink-500 z=1'>
          <thead className='text-xs text-white uppercase bg-gray-50 dark:bg-[#01d28e] dark:text-black-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>ID</th>
              {/* <th scope='col' className='px-6 py-3'>Filename</th> */}
              <th scope='col' className='px-6 py-3'>Timestamp</th>
              <th scope='col' className='px-6 py-3'>Camera</th>
              <th scope='col' className='px-6 py-3'>Image</th>
            </tr>
          </thead>
          <tbody>
            {poacherImages.map((poacherImage, index) => (
              <tr key={poacherImage.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <td className='px-6 py-4'>{index + 1}</td>

                <td className='px-6 py-4'>{poacherImage.timestamp.split('')[0]} {poacherImage.timestamp.split('')[1].replace('-', ':').replace('-', ':')}</td>




                <td className='px-6 py-4'>{poacherImage.camera}</td>
                <td className='px-6 py-4'><img src={poacherImage.image_url} alt={poacherImage.filename} style={{ width: '100px', height: 'auto' }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No poacher images found.</div>
      )}
    </div>
  );
};

export default SuspectTable;
