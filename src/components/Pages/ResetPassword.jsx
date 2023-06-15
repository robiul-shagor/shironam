import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import axios from '../../api/axios';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [messege, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useSearchParams();
    // const getParms = useSearchParams();

    // if( getParms ) {
    //     setToken(getParms);
    // }

    const gettocken = token.get("token");

    const resetPassWordHanddle = async(event) => {
        event.preventDefault();

        try {
            await axios.post('/reset-password', {email, password, c_password: confirmPassword, token: gettocken}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                console.log(res);
                setMessage(res.data.message);
                setStatus(res.data.status);
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='forget-password-wrappers'>
            <header className="fixed top-0 left-0 right-0 bg-white py-6 shadow-md shadow-black/10 z-[1024]">
                <div className="brand-logo text-center">
                    <Link 
                        to="/"
                        className="inline-block max-[575px]:-ml-8"
                    >
                        <img src="/assets/media/logo.svg" className="max-[1199px]:w-[12rem] dark:show" alt="shironam.com" />
                        <img src="../assets/media/logo-dark.svg" className="max-[1199px]:w-[12rem] hidden dark:hidden" alt="shironam.com" />
                    </Link>
                </div>
            </header>

            <div className="form_wrapper mt-32 py-24 px-6">
                <form action="#" className="max-w-[425px] mx-auto mb-0 dark:text-white" onSubmit={resetPassWordHanddle}>
                    <div className="form-title text-center">
                        <h1 className="text-4xl font-medium mb-2 leading-none">
                            Reset Password
                        </h1>
                        <p className="text-2xl">
                            Enter your password.
                        </p>
                    </div>
                    <br/> <br/>
                    <div className="form-group mt-6">
                        <label>
                            Password<span className="text-red-600">*</span>
                        </label>
                        <input type="password" className="form-control form-input" required value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>

                    <div className="form-group mt-6">
                        <label>
                            Confirm Password<span className="text-red-600">*</span>
                        </label>
                        <input type="password" className="form-control form-input" required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />                       
                    </div>

                    <div className="form-group mt-6">
                        <button 
                            type="submit" 
                            className="btn-dark-full">
                            Send Link
                        </button> 
                    </div>
                    <br /><br /><br />
                    <p className="text-center">
                        Have an account? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword