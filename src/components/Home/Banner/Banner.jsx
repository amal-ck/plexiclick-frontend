import React from 'react';
import './Banner.css'; 
import boxImage from '../../../assets/images/Plexi Media/imageInBanner.png';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <>
      <section className="banner-img">
        <div className="absolute top-60 sm:top-40 sm:left-1/4 left-5 transform sm:-translate-x-1/2  sm:-translate-y-1/4 -translate-y-1/2 ">
          <p className='text-md font-bold text-primary-darkBlue sm:mt-0 mt-12'><span>The Acrylic Expert</span></p>
          <h1 className='lg:text-6xl text-3xl text-black font-medium font-serif'>Explore the latest <br /> products and shop<br />the best !</h1>
          <div className="flex flex-col gap-4 mt-4 mt-4">
            <Link to='/products' className='bg-primary-darkBlue lg:w-1/3 w-1/2 p-2 rounded-3xl text-white text-center hover:bg-gray-500'><span>Shop Now</span></Link>
            <Link to='/aboutus' className='bg-pink-600 lg:w-1/3 w-1/2 p-2 rounded-3xl text-white text-center hover:bg-pink-500'><span>Learn More</span></Link>
          </div>
        </div>
        <div className='absolute top-60 sm:top-40 left-3/4 transform -translate-x-1/2 sm:-translate-y-1/4 -translate-y-1/2 hidden sm:block'>
          <img src={boxImage} draggable="false" alt='banner'/>
        </div>
      </section>
    </>
  );
};

export default Banner;
