import React from "react";
import { FaCity } from "react-icons/fa";
const CityCard = ({ name }) => {
  return (
    <article className='relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto mt-24 cursor-pointer w-48 '>
      <div className='absolute inset-0 bg-gradient-to-t from-green-900 via-green-700'></div>

      <div className='z-10 gap-y-1 overflow-hidden text-xl leading-6 text-gray-300 flex flex-col items-center  '>
        <FaCity className='text-2xl' />
        {name}
      </div>
    </article>
  );
};

export default CityCard;
