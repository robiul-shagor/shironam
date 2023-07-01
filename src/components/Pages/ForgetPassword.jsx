import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [messege, setMessage] = useState('');
    const [status, setStatus] = useState('');
    
    const forgetPassWordHanddle = async(event) => {
        event.preventDefault();

        try {
            await axios.post('/forget-password', {email}, {headers: {
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
                        <img src="/assets/media/logo-dark.svg" className="max-[1199px]:w-[12rem] hidden dark:hidden" alt="shironam.com" />
                    </Link>
                </div>
            </header>

            <div className="form_wrapper mt-32 py-24 px-6">
                <form action="#" className="max-w-[425px] mx-auto mb-0 dark:text-white" onSubmit={forgetPassWordHanddle}>
                    <div className="form-title text-center">
                        <h1 className="text-4xl font-medium mb-2 leading-none">
                            Recover Password
                        </h1>
                        <p className="text-2xl">
                            Enter email address that you used.
                        </p>
                    </div>
                    <br/> <br/>
                    <div className="form-group mt-6">
                        <label>
                            Email Address<span className="text-red-600">*</span>
                        </label>
                        <input type="email" className="form-control dark:bg-slate-800 dark:border-0" required valu={email} onChange={(e)=> setEmail(e.target.value)} />

                        { status == "Error" && (
                            <div className="flex items-center bg-theme text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                                <p className='text-white'>{messege}</p>
                            </div>
                        ) }

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

export default ForgetPassword