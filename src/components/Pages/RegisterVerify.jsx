import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../api/axios'
import { UserContext } from '../../App'


const RegisterVerify = () => {
    const [verify, setVerify] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [ token, setToken ] = useState('');
    const { langMode } = useContext(UserContext);
    const navigate = useNavigate();
    
    const handleInputChange = (event) => {
        setVerify(event.target.value);
        setError(''); // Clear the error state when the user inputs again
    };

    const hanndleRegistration = async(event) => {
        event.preventDefault();

        const userData = JSON.parse(sessionStorage.getItem("newUserDetails"));
        if (userData && userData.email_verification_token === parseInt(verify)) {            
            try {
                await axios.post('/verify', { email: userData.email, token: parseInt(verify) }, {headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin': '*',
                }})
                .then(res => {
                    setSuccess(res.data.message);
                    navigate('/login');
                });
            } catch (e) {
                setError(e.response?.data?.errors || 'Something went wrong')
            }
        } else {
            // Code verification failed
            setError('Invalid verification code');
        }
    }
  return (
    <div className="register-main">
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
            <form action="#" className="max-w-[425px] mx-auto mb-0" onSubmit={hanndleRegistration}>
                <div className="form-title text-center">
                    <h1 className="text-4xl font-medium mb-2 leading-none">
                        { langMode == 'BN' ? 'আপনার অ্যাকাউন্ট যাচাই করুন' : 'Verify your account'}
                    </h1>
                </div>
                <br/> <br/>
                <div className="form-group mt-6">
                    <label>
                    { langMode == 'BN' ? 'কোড যাচাই করুন' : 'Verify Code'}<span className="text-red-600">*</span>
                    </label>
                    <input type="text" className="form-control" required value={verify} onChange={handleInputChange} />

                    {error && (<span className="error">{error}</span>)}
                </div> 
          
                <div className="form-group mt-10">
                    <button 
                        type="submit" 
                        className="btn-dark-full">
                        { langMode == 'BN' ? 'যাচাই করুন' : 'Verify'}
                    </button>
                </div>

                <br/><br/><br/>
                <p className="text-center text-black">
                    { langMode == 'BN' ? 'ইতোমধ্যে একজন সদস্য?' : 'Already a member?'} <Link to='/login'>{ langMode == 'BN' ? 'সাইন ইন করুন' : 'Sign In'}</Link>
                </p>
            </form>

            { success && (
              <div className="flex items-center bg-theme_blue text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p className='text-white'>{success}</p>
              </div>
            ) }
        </div>
    </div>
  )
}

export default RegisterVerify