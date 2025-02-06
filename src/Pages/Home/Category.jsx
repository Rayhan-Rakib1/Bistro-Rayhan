import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import img1 from '../../assets/home/slide1.jpg'
import img2 from '../../assets/home/slide2.jpg'
import img3 from '../../assets/home/slide3.jpg'
import img4 from '../../assets/home/slide4.jpg'
import img5 from '../../assets/home/slide5.jpg'
import SectionTitle from '../../components/SectionTitle';

const Category = () => {
    return (
       <section>
        <SectionTitle subHeading={"From 11.00am to 10.00 pm"} heading={"Order Online"}></SectionTitle>
         <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-20 mt-20"
      >
        <SwiperSlide>
            <img src={img1} alt="" />
            <h1 className='-mt-16 uppercase text-2xl text-center text-white'>salads</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img2} alt="" />
            <h1 className='-mt-16 uppercase text-2xl text-center text-white'>pizza</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img3} alt="" />
            <h1 className='-mt-16 uppercase text-2xl text-center text-white'>soups </h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img4} alt="" />
            <h1 className='-mt-16 uppercase text-2xl text-center text-white'>desserts</h1>
        </SwiperSlide>
        <SwiperSlide>
            <img src={img5} alt="" />
            <h1 className='-mt-16 uppercase text-2xl text-center text-white'>salads</h1>
        </SwiperSlide>
      </Swiper>
       </section>
    );
};

export default Category;
