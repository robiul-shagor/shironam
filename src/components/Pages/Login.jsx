import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import { UserContext } from '../../App';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState('');

    const navigate = useNavigate();
    const { userLogin, setUserLogin } = useContext(UserContext);
    const { langMode } = useContext(UserContext);

    const hanndleLogin = async(event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            await axios.post('/login', {email, password}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                //console.log(res.data);
                sessionStorage.setItem("userDetails", JSON.stringify(res.data));
                setUserLogin(res.data);
                setProcessing(false);
                navigate("/");
            });
        } catch (e) {
            console.log(e);
        }

        if (rememberMe) {
            localStorage.setItem('rememberedPassword', password);
        } else {
            localStorage.removeItem('rememberedPassword');
        }
    };

    useEffect(() => {
        const storedPassword = localStorage.getItem('rememberedPassword');
        if (storedPassword) {
          setPassword(storedPassword);
          setRememberMe(true);
        }
    }, []);

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };
    

  return (
    <div className="login-main">
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

        <div className="form_wrapper mt-32 py-24 px-6 bg-white">
            { !userLogin && (userLogin.normal_user !== 'undefined' ) ? (
                <form action="#" className="max-w-[425px] mx-auto mb-0" onSubmit={hanndleLogin}>
                    <div className="form-title text-center">
                        <h1 className="text-4xl font-semibold mb-2 leading-none">
                            { langMode == 'BN' ? 'লগইন' : 'Login'}
                        </h1>
                        <p className="text-2xl text-black">
                            { langMode == 'BN' ? 'আপনার ইমেইল এবং পাসওয়ার্ড ব্যবহার করে এখানে লগইন করুন' : ' Login here using your email and password'}
                        </p>
                    </div>
                    <br />
                    <div className="form-group mt-6">
                        <label>
                            { langMode == 'BN' ? 'ইমেইল' : 'Email Address'}<span className="text-red-600">*</span>
                        </label>
                        <input type="email" className="form-control" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>

                    <div className="form-group mt-6">
                        <label>
                            { langMode == 'BN' ? 'পাসওয়ার্ড' : 'Password'}<span className="text-red-600">*</span>
                        </label>
                        <input type="password" className="form-control form-input" required value={password} onChange={(e)=> setPassword(e.target.value)} />
                        <div className="form-check mt-6 mb-7">
                            <input type="checkbox" value="" id="rememberPassword" checked={rememberMe} onChange={handleRememberMeChange} />
                            <label htmlFor="rememberPassword">
                                { langMode == 'BN' ? 'পাসওয়ার্ড সংরক্ষণ' : 'Remember Password'}
                            </label>
                        </div>
                    </div>

                    <div className="form-group mt-6">
                        <button 
                            type="submit" 
                            className="btn-dark-full">
                            { processing ? ( 
                                langMode == 'BN' ? 'লগইন করার জন্য অপেক্ষা করুন...' : 'Wait for login...'
                                ) : (
                                langMode == 'BN' ? 'সাইন ইন করুন' : 'Sign In'
                            ) }
                        </button>       
                        
                        <p className="text-center mt-4">
                            <Link className='text-center mt-4' to='/forget-password'>
                                { langMode == 'BN' ? 'পাসওয়ার্ড ভুলে গেছেন' : 'Forgot Password'}
                            </Link>         
                        </p>
                    </div>
                    <br/><br/><br/>
                    <p className="text-center text-black">
                    { langMode == 'BN' ? 'অ্যাকাউন্ট প্রয়োজন' : 'Need Account'}? <Link to='/register'>{ langMode == 'BN' ? 'নিবন্ধন করুন' : 'Sign Up'}</Link>
                    </p>
                </form>
            ) : (
                <div className="form-title text-center">
                <h1 className="text-4xl font-semibold mb-2 leading-none">
                    { langMode == 'BN' ? 'সাইন ইন করুন' : 'Login'}                    
                </h1>
                <p className="text-2xl text-black">
                    { langMode == 'BN' ? 'আপনি ইতিমধ্যে লগইন.' : ' You are already login.'}
                </p>
            </div>
            ) }
        </div>
    </div>
  )
}

export default Login