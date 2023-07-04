import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../App';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../../api/axios';

function LoginModal() {
    const { langMode } = useContext(UserContext);
    const { userLogin, setUserLogin } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const [processing, setProcessing] = useState('');

    const navigate = useNavigate();


    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const hanndleLogin = async(event) => {
        event.preventDefault();
        setProcessing(true);

        try {
            await axios.post('/login', {email, password}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                sessionStorage.setItem("userDetails", JSON.stringify(res.data));
                setUserLogin(res.data);
                setProcessing(false);
                navigate("/");
            });
        } catch (e) {
            if (e.response && e.response.status === 422) {
                setMessage( ( langMode == 'BN' ) ? 'আনপ্রসেস এন্টিটি: অনুগ্রহ করে আপনার ইনপুট চেক করুন।' : 'Unprocessable Entity: Please check your input.');
            } else {
                setMessage( ( langMode == 'BN' ) ? 'একটি ত্রুটি ঘটেছে. অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন.' : 'An error occurred. Please try again later.');
            }
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

    return (
        <form className="max-w-[425px] mx-auto mb-0" onSubmit={hanndleLogin}>
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
                <input type="email" className="form-control bg-white dark:bg-[#272727] dark:text-white" required value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </div>

            <div className="form-group mt-6">
                <label>
                    { langMode == 'BN' ? 'পাসওয়ার্ড' : 'Password'}<span className="text-red-600">*</span>
                </label>
                <input type="password" className="form-control form-input bg-white dark:bg-[#272727] dark:text-white" required value={password} onChange={(e)=> setPassword(e.target.value)} />
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

                { message && (
                    <div className="flex items-center bg-theme text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                    <p className='text-white'>{message}</p>
                    </div>
                ) }      
                
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
    )
}

export default LoginModal