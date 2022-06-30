import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios'




const Login = ({ setLoggedIn, loggedIn }) => {
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [errorMessaage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            setLoading(false)
            setLoggedIn(true);
            navigate('/bills')
        }
    }, [token, navigate, setLoggedIn])

    const onSubmit = async (data) => {
        setLoading(true)
        const user = {
            email: data.email,
            password: data.password
        }
        const { data: response } = await axios.post('https://billing-system-1542.herokuapp.com/api/login', user);
        if (response?.token) {
            localStorage.setItem('accessToken', response.token)
            setToken(response.token)
        } else if (response.error) {
            setLoading(false)
            setErrorMessage(response.message)
        }
    }


    if (loading) {
        return <Loading />
    }


    return (
        <div className='h-[calc(100vh-100px)] flex justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold text-primary">Login</h2>
                    {errorMessaage && <p className="text-red-500 my-2">{errorMessaage}</p>}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* email input */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: 'Email is Required'
                                    },
                                    pattern: {
                                        value: /[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                        message: 'Valid Email is needed'
                                    }
                                }
                                )}
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        {/* password input */}
                        <div className="form-control w-full max-w-md">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: 'Password is Required'
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Must be 6 characters or longer"
                                    }
                                }
                                )}
                                type="password"
                                placeholder="Your Password"
                                className="input input-bordered w-full max-w-xs"
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>

                        <input type="submit" value={'Login'} className='btn btn-primary text-white w-full max-w-md mt-3' />
                    </form>

                    <p className="text-center my-2">New to billing system? <Link to='/registration' className='text-primary'>Create an account</Link> </p>

                </div>
            </div>
        </div>
    );
};

export default Login;