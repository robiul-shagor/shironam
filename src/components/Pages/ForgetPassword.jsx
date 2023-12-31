import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios';
import { UserContext } from '../../App';
import Spinner from '../Elements/Spinner';
import LogoElement from '../Common/Header/LogoElement';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [messege, setMessage] = useState('');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [ loading, setLoading ] = useState(false);
    const { langMode } = useContext(UserContext);
    const navigate = useNavigate();
    
    const forgetPassWordHanddle = async(event) => {
        event.preventDefault();
        setLoading(true)

        try {
            await axios.post('/forget-password', {email}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                setMessage(res.data.message);
                setStatus(res.data.status);
                navigate('/reset-password');

                localStorage.setItem('tempEmail', res.data.email);
            });
        } catch (e) {
            if( e.response.data.status == 'Error' ) {
                setError(e.response.data.message);
            }
        } finally {
            setLoading(false)
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
                <form action="#" className="max-w-[425px] mx-auto mb-0 dark:text-white" onSubmit={forgetPassWordHanddle}>
                    <div className="form-title text-center">
                        <h1 className="text-4xl font-medium mb-2 leading-none">
                            { langMode == 'BN' ? 'পাসওয়ার্ড পুনরুদ্ধার করুন' : 'Recover Password' }
                        </h1>
                        <p className="text-2xl">
                            { langMode == 'BN' ? 'আপনি যে ইমেল ঠিকানা ব্যবহার করেছেন তা লিখুন।' : 'Enter email address that you used.' }
                        </p>
                    </div>
                    <br/> <br/>
                    <div className="form-group mt-6">
                        <label>
                            { langMode == 'BN' ? 'ইমেইল' : 'Email Address' }
                            <span className="text-red-600">*</span>
                        </label>
                        <input type="email" className="form-control dark:bg-slate-800 dark:border-0" required value={email} onChange={(e)=> setEmail(e.target.value)} />

                        {typeof error.email !== 'undefined' && <span className="error">{error.email}</span>}

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
                            { loading ? <Spinner /> :  langMode == 'BN' ? 'লিঙ্ক পাঠান' : ' Send Link' }
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

export default ForgetPassword