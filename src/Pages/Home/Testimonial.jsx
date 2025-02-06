import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle';


import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css'


const Testimonial = () => {
const [reviews, setReviews] = useState([]);

useEffect(() => {
    fetch('https://bistro-boss-server-psi-sand.vercel.app/reviews')
    .then(res => res.json())
    .then(data => setReviews(data));
},[])
    return (
        <section>
            <SectionTitle heading={'testimonial'} subHeading={'What our client say'}></SectionTitle>
            
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        
        {
            reviews.map(review => <SwiperSlide key={review._id}>
                <div className='m-24 flex items-center flex-col '>
                <Rating
      style={{ maxWidth: 180 }}
      value={review.rating}
      readOnly
    />
                    <p>{review.details}</p>
                    <h4 className='text-3xl text-center text-orange-500'>{review.name}</h4>
                </div>
            </SwiperSlide>)
        }
      </Swiper>
        </section>
    );
};

export default Testimonial;