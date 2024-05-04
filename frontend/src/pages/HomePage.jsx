import React from "react";
import StatCard from "../components/Card";
import Location from "../components/Location";
import MotiveImages from "../components/Motive";
import Slogan from "../components/Slogan";

function HomePage() {
  const items = [
    {
      imageSrc:
        "https://c8.alamy.com/comp/2B7MAD0/this-area-is-a-smoke-free-zone-sign-with-no-smoking-symbols-2B7MAD0.jpg",
      text: "Make Smoke Free",
      description: "Prevent people from smoking in public place",
    },
    {
      imageSrc:
        "https://estuary.dev/static/fde13056c70783b74f41b10d9649f74a/3a40c/dd278b_03_Real_Time_Processing_Benefits_d8291dd351.jpg",
      text: "Real-time Processing",
      description:
        "Optimize the system to detect smoking incidents in real-time, ensuring prompt alerts to relevant authorities.",
    },
    // Add more items as needed
  ];
  return (
    <div className='relative'>
      <div className='mb-1'>
        <h1 className='text-3xl font-semibold  text-white mb-4'>Overview</h1>
      </div>

      <div className='flex gap-8'>
        <StatCard
          title='Total Cameras'
          number='4'
        />
        <StatCard
          title='Total Suspects'
          number='10'
        />
      </div>
      <div className='flex  mt-16  gap-30 items-center '>
        <div>
          <h1 className='text-3xl font-semibold  text-white mb-4'>Our Goal</h1>
          <MotiveImages items={items} />
        </div>
        <div className="ml-5">
          <h1 className='text-3xl font-semibold  text-white mb-4'>Locations</h1>
          <Location />
        </div>
      </div>
      <div className='relative'>
        <Slogan />
      </div>
    </div>
  );
}

export default HomePage;
