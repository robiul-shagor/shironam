import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import { UserContext } from '../../App';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const { userLogin, setUserLogin } = useContext(UserContext);

    const hanndleLogin = async(event) => {
        event.preventDefault();

        try {
            await axios.post('/login', {email, password}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                //console.log(res.data);
                sessionStorage.setItem("userDetails", JSON.stringify(res.data));
                setUserLogin(res.data);
                navigate("/");
            });
            setEmail(email);
            setPassword(password);
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
                            Login                    
                        </h1>
                        <p className="text-2xl text-black">
                            Login here using your username and password
                        </p>
                    </div>
                    <br />
                    <div className="form-group mt-6">
                        <label>
                            Email Address<span className="text-red-600">*</span>
                        </label>
                        <input type="email" className="form-control" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group mt-6">
                        <label>
                            Password<span className="text-red-600">*</span>
                        </label>
                        <input type="password" className="form-control form-input" required value={password} onChange={(e)=> setPassword(e.target.value)} />

                        <div className="form-check mt-6 mb-7">
                            <input type="checkbox" value="" id="rememberPassword" checked={rememberMe} onChange={handleRememberMeChange} />
                            <label htmlFor="rememberPassword">
                                Remember Password
                            </label>
                        </div>
                    </div>
                    <div className="form-group mt-6">
                        <button 
                            type="submit" 
                            className="btn-dark-full">
                            Sign In
                        </button>                
                        <p className="text-center mt-4">
                            <a href="recover-password.html" className="underline">
                                Forgot Password?
                            </a>
                        </p>
                    </div>
                    <br/><br/><br/>
                    <p className="text-center text-black">
                        Need an account? <Link to='/register'>Sign Up</Link>
                    </p>
                </form>
            ) : (
                <div className="form-title text-center">
                <h1 className="text-4xl font-semibold mb-2 leading-none">
                    Login                    
                </h1>
                <p className="text-2xl text-black">
                    You are already login.
                </p>
            </div>
            ) }
        </div>
    </div>
  )
}

export default Login