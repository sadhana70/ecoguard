import React from 'react'
import { tiger } from '../assets'


const CTA = () => {
  return (
    <div className='w-full bg-[#E9F8F3] py-24'>
      <div className='md:max-w-[1480px] m-auto grid md:grid-cols-2 gap-8 max-w-[600px] items-center  px-4 md:px-0'>

        {/* <img src='../img/logo.jpg' className="w-[650px] mx-auto" /> */}
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

export default CTA