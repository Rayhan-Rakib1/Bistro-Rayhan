import React from 'react';
import Banner from './Banner';
import Category from './Category';
import Menu from './Menu';
import Featured from './Featured';
import Testimonial from './Testimonial';
import BistroBoss from './BistroBoss';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
            <Banner></Banner>
            <BistroBoss></BistroBoss>
            <Category></Category>
            <Menu></Menu>
            <Featured></Featured>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;