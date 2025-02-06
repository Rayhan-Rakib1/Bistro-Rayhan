import React from 'react';
import SectionTitle from '../../components/SectionTitle';
import featuredImg from '../../assets/home/featured.jpg'
import './HomePage.css';

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white'>
            <SectionTitle heading='Featured Item' subHeading='Check it out'></SectionTitle>
            <div className='md:flex pb-20 pt-10 px-32 justify-center '>
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className='md:ml-10'>
                    <p>Aug 20, 2023</p>
                    <p className='uppercase'>Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis rerum quaerat fuga sequi veniam deserunt vero enim impedit iste repudiandae.</p>
                    <button className='btn btn-outline border-0 text-white border-b-4'>Order now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;