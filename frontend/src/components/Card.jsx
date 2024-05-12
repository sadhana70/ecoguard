import React from "react";
import './index.css';

const StatCard = ({ title, number }) => {
  return (
    <div className=' p-6  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
      <h2 className='text-xl font-semibold text-white'>{title}</h2>
      <p className='text-4xl font-bold text-white mt-2'>{number}</p>
    </div>
  );
};

export default StatCard;
