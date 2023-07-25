import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import LoginModal from '../Component/LoginModal';
import { UserContext } from '../../../App';

const Footer = () => {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const [showModal, setShowModal] = useState(false);
    const  { langMode } = useContext(UserContext);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClose = (event) => {
        event.preventDefault();
        setShowModal(!showModal);
    }
    
    const handleScroll = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        const scrollPosition = windowHeight + scrollTop;

        if (scrollPosition >= documentHeight) {
            setShowModal(true);
        }
    };
    

    return (
        <div>
            <footer className="bg-white max-[767px]:pb-[8rem] dark:bg-[#272727] dark:text-white">
                <div className="container">
                    <div className="footer_top py-16 xl:py-20 border-t border-b border-gray-300 dark:border-t-transparent sm:grid sm:grid-cols-12 space-y-10">
                        <div className="widget col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-4">
                            <div className="brand_nav mb-10">
                                <Link to='/'>
                                    <img src="/assets/media/logo.svg" className="dark:hidden" alt="Shironam" />
                                    <img src="/assets/media/logo-dark.svg" className="hidden dark:inline" alt="Shironam" />
                                </Link>
                            </div>
                            <h6 className="text-2xl mb-4">{langMode == 'BN' ? 'আমাদের অনুসরণ করো' : 'Follow Us'}</h6>
                            <div className="social_icons space-x-4">
                                <a href="#" className="text-2xl hover:text-red-600 transition-all">
                                    <i className="fab fa-facebook-square"></i>
                                </a>
                                <a href="#" className="text-2xl hover:text-red-600 transition-all">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="text-2xl hover:text-red-600 transition-all">
                                    <i className="fab fa-youtube"></i>
                                </a>
                                <a href="#" className="text-2xl hover:text-red-600 transition-all">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="text-2xl hover:text-red-600 transition-all">
                                    <i className="fab fa-discord"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div className="widget col-span-6 md:col-span-5 lg:col-span-4">
                            <ul className="footer_top_menu gap-6 grid grid-cols-2">
                                <li className="inline mr-6">
                                    <Link to='/about-us' className='text-2xl hover:underline'>{langMode == 'BN' ? 'আমাদের সম্পর্কে' : 'About Us'}</Link>
                                </li>
                                <li className="inline mr-6">
                                    <Link to='/advertisement' className='text-2xl hover:underline'>{langMode == 'BN' ? 'বিজ্ঞাপন' : 'Advertisement'}</Link>
                                </li>
                                <li className="inline mr-6">
                                    <Link to='/contact-us' className='text-2xl hover:underline'>{langMode == 'BN' ? 'যোগাযোগ করুন' : 'Contact Us'}</Link>
                                </li>
                                <li className="inline mr-6">
                                    <a href="#" className="text-2xl hover:underline ">{langMode == 'BN' ? 'নিউজলেটার' : 'Newsletter'}</a>
                                </li>
                                <li className="inline mr-6">
                                    <a href="#" className="text-2xl hover:underline ">{langMode == 'BN' ? 'অ্যাপস' : 'Apps'}</a>
                                </li>
                                <li className="inline mr-6">
                                    <Link to='/privacy-policy' className='text-2xl hover:underline'>{langMode == 'BN' ? 'গোপনীয়তা নীতি' : 'Privacy & Policy'}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="widget col-span-full md:col-span-3 lg:col-span-3 lg:col-start-9 xl:col-start-10">
                            <h6 className="text-2xl">{langMode == 'BN' ? 'মোবাইল অ্যাপস ডাউনলোড করুন' : 'Download mobile apps'}</h6>
                            <ul className="mt-6 flex items-center space-x-6 divide-x divide-gray-500">
                                <li>
                                    <div className="buttons space-y-4 grid">
                                        <a href="#">
                                            <img src="/assets/media/google-play-badge.svg" alt="" />
                                        </a>
                                        <a href="#">
                                            <img src="/assets/media/appstore-button.svg" alt="" />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <div className="qr pl-6">
                                        <img src="/assets/media/app_download_qr.png" alt="Download Mobile App QR" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footer_bottom sm:flex items-center justify-between pt-10 md:pt-14 pb-10">
                        <div className="copyright basis-1/2 text-2xl text-center sm:text-left">
                            <p>
                                {langMode == 'BN' ? 'কপিরাইট @ 2023, শিরোনাম। সমস্ত অধিকার সংরক্ষিত.' : 'Copyright @ 2023, SHIRONAM. All rights reserved.'}
                                
                            </p>
                        </div>
                        <div className="footer_bottom_menu basis-1/2 space-x-7 text-2xl text-center sm:text-right">
                            <Link to='/about-us'>{langMode == 'BN' ? 'আমাদের সম্পর্কে' : 'About Us'}</Link>
                            <Link to='/advertisement'>{langMode == 'BN' ? 'বিজ্ঞাপন' : 'Advertisement'}</Link>
                            <Link to='/privacy-policy'>{langMode == 'BN' ? 'গোপনীয়তা নীতি' : 'Privacy & Policy'}</Link>
                        </div>
                    </div>
                </div>
            </footer>

            { ( userData == null && showModal ) && (
                <div id="show_login_modal" className="fixed inset-0 z-[1055] h-full w-full bg-white dark:bg-[#272727] dark:text-white">
                    <div className="flex flex-col h-full justify-end">
                        <div className="bg-white dark:bg-[#272727] dark:text-white transition-all duration-300 ease-in-out translate-y-[100%] overflow-y-auto transform-none opacity-100">
                            <button 
                                type="button" 
                                className="w-14 h-14 bg-white dark:bg-[#272727] dark:text-white border rounded-md flex items-center justify-center absolute right-4 top-4 focus:shadow-none focus:outline-none"  
                                onClick={handleClose}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                            </button>

                            <div className="max-w-4xl mx-auto py-20 px-8">
                                <LoginModal />
                            </div>
                        </div>
                    </div>
                </div>
            ) }

            { ( userData == null && showModal  ) && (
                <div className="undefined opacity-50 transition-all duration-300 ease-in-out fixed top-0 left-0 z-[1040] bg-black w-screen h-screen"></div>
            ) }
        </div>
    )
}

export default Footer