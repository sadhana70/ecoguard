/*import React from 'react'
import { tiger } from '../assets'


const CTA = () => {
  return (
    <div className='w-full bg-[#E9F8F3] py-24'>
      <div className=' m-auto grid md:grid-cols-2 gap-8 items-center  px-4 md:px-0'>

        <img src={tiger} className="w-[650px] mx-auto" />





        <div>
          <h1 className='py-2  text-3xl font-semibold'>Cherish <span className='text-[#20B486]'>Wildlife</span> Save Our <span className='text-[#20B486]'>Forests:</span> </h1>
          <p className='py-2 text-lg text-gray-600'>A Unified Front Against Poaching & Deforestation"</p>
          <button className='max-[780px]:w-full my-4 px-8 py-5 rounded-md bg-[#20B486] text-white font-bold'>Ecoguard</button>


        </div>




      </div>


    </div>
  )
}

export default CTA*/

import React from 'react';
import { tiger } from '../assets';

const CTA = () => {
  return (
    <div className='h-screen bg-[#E9F8F3]'>
      <div className='max-w-screen-xl mx-auto px-4 md:px-8 h-full flex justify-center items-center'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>

          <div className='md:order-2'>
            <h1 className='py-2 text-3xl md:text-4xl font-semibold'>Cherish <span className='text-[#01d28e]'>Wildlife</span> Save Our <span className='text-[#01d28e]'>Forests:</span> </h1>
            <p className='py-2 text-lg text-gray-600'>A Unified Front Against Poaching & Deforestation</p>
            <button className='max-w-[250px] w-full my-4 px-8 py-5 rounded-md bg-[#01d28e] text-white font-bold'>Ecoguard</button>
          </div>

          <div className='md:order-1'>
            <img src={tiger} className="w-full md:w-auto mx-auto" alt="Tiger" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CTA;
