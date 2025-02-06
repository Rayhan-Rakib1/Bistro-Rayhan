import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import SocialLoginGoogle from '../../components/SocialLoginGoogle';

const SignUp = () => {
  const { createUser, setUser, updateUserProfile } = useContext(AuthContext);

  const axiosPublic = UseAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // Define the onSubmit function
  const onSubmit = (data) => {

    createUser(data.email, data.password)
      .then(res => {
        const user = res.user;
        setUser(user)
        console.log(user);

        updateUserProfile(data.name, data.photo)
          .then(res => {
            // crate user entry in database
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users', userInfo)
              .then(res => {
                if (res.data.insertedId) {
                  console.log('user added successfully in database');
                  reset();
                  Swal.fire({
                    title: "sign Up!",
                    icon: "success",
                    draggable: true
                  });
                  navigate('/')
                }
              })

          })
          .catch((error) => {
            console.log(error.message);
          })


      })
      .catch(error => {
        console.log('error:', error.message);
      })
  };


  return (
    <>
      <Helmet>
        <title>Bistro Boss | Sign up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="Enter your name"
                  className="input input-bordered"
                />
                {errors.name && <span className="text-red-500">Name is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="url"
                  {...register("photo", { required: true })}
                  placeholder="Enter your photo URL"
                  className="input input-bordered"
                />
                {errors.photo && <span className="text-red-500">Photo URL is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Your email"
                  className="input input-bordered"
                />
                {errors.email && <span className="text-red-500">Email is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true, minLength: 6, maxLength: 20, pattern:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === 'required' && <span className="text-red-500">Password is required</span>}

                {errors.password?.type === 'minLength' && <span className="text-red-500">Password  must be 6 characters</span>}

                {errors.password?.type === 'pattern' && <span className="text-red-500">Password  must be one uppercase, one lowercase, one spacial character to all into  8 characters</span>}

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign Up</button>
              </div>
            </form>
            <div className='flex flex-col items-center'>
              <p>Already have an account? <Link className='text-blue-600 underline' to='/login'>Login</Link></p>
            </div>
            <div className='divider w-11/12 mx-auto'>
            </div>
            <SocialLoginGoogle></SocialLoginGoogle>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default SignUp;
