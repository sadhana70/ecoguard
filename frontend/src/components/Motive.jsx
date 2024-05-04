import React from "react";

const MotiveImages = ({ items }) => {
 

  return (
    <div className='flex flex-wrap justify-center gap-5  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      {items.map((item, index) => (
        <div
          key={index}
          className='max-w-sm mx-2 my-4 overflow-hidden shadow-md'
        >
          <img
            className='object-cover w-80 h-64'
            src={item.imageSrc}
            alt={`Image ${index + 1}`}
          />
          <div className='p-4'>
            <p className='text-lg font-semibold text-white'>{item.text}</p>
            <p className='mt-2 text-white'>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MotiveImages;
