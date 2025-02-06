import React, { useContext, useEffect, useState } from 'react'; import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLoginGoogle from '../../components/SocialLoginGoogle';


const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.form?.pathname || '/';

    const { signIn, setUser, user } = useContext(AuthContext);


    const [disabled, setDisabled] = useState(true)

    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, [])

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });

        signIn(email, password)
            .then(res => {
                const user = res.user;

                console.log(user);

                Swal.fire({
                    title: "User login successful",
                    showClass: {
                        popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                        popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                });

                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
            })

    }

    // const handleValidateCaptcha = (e) => {
    //     const userCaptchaValue = e.target.value;
    //     if (validateCaptcha(userCaptchaValue)) {
    //         setDisabled(false)
    //     }
    //     else {
    //         setDisabled(false)
    //     }
    // }

    return (
        <>

            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2 max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>

                                {/* <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input  onBlur={handleValidateCaptcha} type="text" name='captcha' placeholder="Type the captcha above" className="input input-bordered" required /> */}


                            </div>
                            <div className="form-control mt-6">
                                <button disabled={false} className="btn btn-primary">Login</button>
                            </div>
                        </form>

                        <div className='flex flex-col items-center'>
                            <p>New here? <Link to='/signUp'>Create an account</Link></p>
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

export default Login;