import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../api/axios'
import { UserContext } from '../../App'


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCpassword] = useState('');

    const hanndleRegistration = async(event) => {
        event.preventDefault();

        try {
            await axios.post('/register', {name, email, password, c_password: cPassword}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                //console.log(res.data);
                // sessionStorage.setItem("userDetails", JSON.stringify(res.data));
                // setUserLogin(res.data);
                // navigate("/");
            });
            // setEmail(email);
            // setPassword(password);
        } catch (e) {
            console.log(e);
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
                    <img src="../assets/media/logo-dark.svg" className="max-[1199px]:w-[12rem] hidden dark:hidden" alt="shironam.com" />
                </Link>
            </div>
        </header>

        <div className="form_wrapper mt-32 py-24 px-6">
            <form action="#" className="max-w-[425px] mx-auto mb-0" onSubmit={hanndleRegistration}>
                <div className="form-title text-center">
                    <h1 className="text-4xl font-medium mb-2 leading-none">
                        Create an account                 
                    </h1>
                    <p className="text-2xl text-black">
                        Let's go through a few steps
                    </p>
                </div>
                <br/> <br/>
                <div className="form-group mt-6">
                    <label>
                        Full Name<span className="text-red-600">*</span>
                    </label>
                    <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group mt-6">
                    <label>
                        Email<span className="text-red-600">*</span>
                    </label>
                    <input type="email" className="form-control" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className="form-group mt-6">
                    <label>
                        Password<span className="text-red-600">*</span>
                    </label>
                    <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>                
                
                <div className="form-group mt-6">
                    <label>
                        Confirm Password<span className="text-red-600">*</span>
                    </label>
                    <input type="c_password" className="form-control" required value={cPassword} onChange={(e) => setCpassword(e.target.value)} />
                </div>

                <div className="form-group mt-10">
                    <button 
                        type="submit" 
                        className="btn-dark-full">
                        Sign Up
                    </button>
                </div>

                <br/><br/><br/>
                <p className="text-center text-black">
                    Already a member? <Link to='/login'>Sign In</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Register