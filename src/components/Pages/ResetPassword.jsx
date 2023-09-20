import { useState, useContext } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import axios from '../../api/axios';
import { UserContext } from '../../App';
import LogoElement from '../Common/Header/LogoElement';

const ResetPassword = () => {
    //const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { langMode } = useContext(UserContext); 
    const navigate = useNavigate();
    // const getParms = useSearchParams();

    // if( getParms ) {
    //     setToken(getParms);
    // }

    const email = localStorage.getItem('tempEmail');

    const resetPassWordHanddle = async(event) => {
        event.preventDefault();

        try {
            await axios.post('/reset-password', {email, password, c_password: confirmPassword, token: otp}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                setMessage( langMode == 'BN' ? res.data.message_bn : res.data.message );

                if( typeof res.data.status !== 'undefined' && res.data.status == 'Error' ) {
                    setError( {
                        'otp': langMode == 'BN' ? res.data.message_bn : res.data.message
                    }  )
                } else {
                    setTimeout( function() {
                        navigate('/login')
                    }, 1000)
                }
            });
        } catch (e) {
            console.log(e)
            setError(e.response.data.message)
        }
    }

    return (
        <div className='forget-password-wrappers'>
            <header className="fixed top-0 left-0 right-0 bg-white dark:bg-[#272727] dark:text-white py-6 shadow-md shadow-black/10 z-[1024]">
                <div className="brand-logo text-center">
                    <LogoElement />
                </div>
            </header>

            <div className="form_wrapper bg-white dark:bg-[#272727] dark:text-white mt-32 py-24 px-6 bg-white">
                <form action="#" className="max-w-[425px] mx-auto mb-0 dark:text-white" onSubmit={resetPassWordHanddle}>
                    <div className="form-title text-center">
                        <h1 className="text-4xl font-medium mb-2 leading-none">
                             { langMode == 'BN' ? 'পাসওয়ার্ড রিসেট করুন' : 'Reset Password' }
                        </h1>
                        <p className="text-2xl">
                            { langMode == 'BN' ? 'আপনার পাসওয়ার্ড লিখুন.' : 'Enter your password.' }
                        </p>
                    </div>
                    <br/> <br/>
                    <div className="form-group mt-6">
                        <label>
                        {langMode == 'BN' ? 'ইমেইল' : 'Email Address'}<span className="text-red-600">*</span>
                        </label>
                        <input type="email" className="form-control form-input bg-white dark:bg-[#272727] dark:text-white" readOnly disabled  value={email} style={{opacity: 0.5}} />
                    </div>

                    <div className="form-group mt-6">
                        <label>
                        { langMode == 'BN' ? 'পাসওয়ার্ড' : 'Password' }<span className="text-red-600">*</span>
                        </label>
                        <input type="password" className="form-control form-input bg-white dark:bg-[#272727] dark:text-white" required value={password} onChange={(e)=> setPassword(e.target.value)} />
                        {typeof error.password !== 'undefined' && <span className="error">{error.password}</span>}
                    </div>

                    <div className="form-group mt-6">
                        <label>
                            { langMode == 'BN' ? 'পাসওয়ার্ড নিশ্চিত করুন' : 'Confirm Password' }<span className="text-red-600">*</span>
                        </label>
                        <input type="password" className="form-control form-input bg-white dark:bg-[#272727] dark:text-white" required value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />                      
                        {typeof error.c_password !== 'undefined' && <span className="error">{error.c_password[0]}</span>} 
                    </div>

                    <div className="form-group mt-6">
                        <label>
                            { langMode == 'BN' ? 'ওটিপি কোড' : 'OTP Code'}<span className="text-red-600">*</span>
                        </label>
                        <input type="text" className="form-control form-input bg-white dark:bg-[#272727] dark:text-white" required value={otp} onChange={(e)=> setOtp(e.target.value)} />    
                        {typeof error.otp !== 'undefined' && <span className="error">{error.otp}</span>}                    
                    </div>

                    <div className="form-group mt-6">
                        <button 
                            type="submit" 
                            className="btn-dark-full">
                            {langMode == 'BN' ? 'পাসওয়ার্ড রিসেট করুন' : 'Reset Password'}
                        </button> 
                    </div>
                    <br /><br /><br />
                    <p className="text-center">
                        { langMode == 'BN' ? 'একাউন্ট আছে?' : 'Have an account?' }
                        <Link to="/login">{ langMode == 'BN' ? 'সাইন ইন করুন' : 'Sign In' }</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword