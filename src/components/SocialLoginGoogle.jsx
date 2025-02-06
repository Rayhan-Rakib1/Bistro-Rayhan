import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import UseAuth from '../hooks/UseAuth';
import UseAxiosPublic from '../hooks/UseAxiosPublic';
import { useNavigate } from 'react-router-dom';

const RoundedSocialLoginGoogle = () => {
const {googleSignIn} = UseAuth();
const axiosPublic = UseAxiosPublic();
const navigate = useNavigate();


  const handleGoogleSignIn = () => {
    googleSignIn()
    .then(res => {
        console.log(res.user);
        const userInfo ={
          email: res.user?.email,
          name: res.user?.
          displayName
        }
        axiosPublic.post('/users', userInfo)
        .then(res => {
          console.log(res.data);
          navigate('/');
        })
    } )
  };

  return (
    <div className="mt-6 mb-6 text-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-3/4 max-w-sm mx-auto p-3 text-white bg-gray-500 hover:bg-gray-700 rounded-full shadow-lg transition duration-300 ease-in-out"
      >
        <FaGoogle className="mr-2 text-xl" />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default RoundedSocialLoginGoogle;
