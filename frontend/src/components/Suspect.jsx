import React from "react";

const SuspectTable = () => {
  // Array of data
  const data = [
    {
      date: "2023-12-25",
      time: "12:00 PM",
      location: "Your Location",
      image:
        "https://plus.unsplash.com/premium_photo-1669590487094-c01dfc2ee939?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8fA",
    },
    {
      date: "2023-12-25",
      time: "12:00 PM",
      location: "Your Location",
      image:
        "https://transcode-v2.app.engoo.com/image/fetch/f_auto,c_lfill,w_300,dpr_3/https://assets.app.engoo.com/images/5s9iV71He6yV2yYimPzFyD.jpeg",
    },
    {
      date: "2023-12-25",
      time: "12:00 PM",
      location: "Your Location",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvweOemHFxv65-rxTYrUVtqyrx7MrCszX7xA&usqp=CAU",
    },
    {
      date: "2023-12-25",
      time: "12:00 PM",
      location: "Your Location",
      image:
        "https://assets.thehansindia.com/h-upload/2021/02/06/1029408-smoke.webp",
    },
    {
      date: "2023-12-25",
      time: "12:00 PM",
      location: "Your Location",
      image:
        "https://plus.unsplash.com/premium_photo-1669590487094-c01dfc2ee939?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8fA",
    },
  ];

  return (
    <div className='relative overflow-x-auto mr-6'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th
              scope='col'
              className='px-6 py-3'
            >
             SN
            </th>
            <th
              scope='col'
              className='px-6 py-3'
            >
              Date
            </th>
            <th
              scope='col'
              className='px-6 py-3'
            >
              Time
            </th>
            <th
              scope='col'
              className='px-6 py-3'
            >
              Location
            </th>
            <th
              scope='col'
              className='px-6 py-3'
            >
              Image
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
            >
              <td className='px-6 py-4'>{index + 1}</td>
              <td className='px-6 py-4'>{item.date}</td>
              <td className='px-6 py-4'>{item.time}</td>
              <td className='px-6 py-4'>{item.location}</td>
              <td className='px-6 py-4'>
                <img
                  src={item.image}
                  alt={`Image ${index}`}
                  className='w-16 h-16 object-cover'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuspectTable;
