import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: 'https://bistro-boss-server-psi-sand.vercel.app'
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;