import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white max-[767px]:pb-[8rem] dark:bg-[#272727] dark:text-white">
        <div className="container">
            <div className="footer_top py-16 xl:py-20 border-t border-b border-gray-300 dark:border-t-transparent sm:grid sm:grid-cols-12 space-y-10">
                <div className="widget col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-4">
                    <div className="brand_nav mb-10">
                        <a href="#">
                            <img src="../assets/media/logo.svg" className="dark:hidden" alt="Shironam" />
                            <img src="../assets/media/logo-dark.svg" className="hidden dark:inline" alt="Shironam" />
                        </a>
                    </div>
                    <h6 className="text-2xl mb-4">Follow Us</h6>
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
                            <a href="#" className="text-2xl hover:underline ">About Us</a>
                        </li>
                        <li className="inline mr-6">
                            <a href="#" className="text-2xl hover:underline ">Advertisement</a>
                        </li>
                        <li className="inline mr-6">
                            <a href="#" className="text-2xl hover:underline ">Contact Us</a>
                        </li>
                        <li className="inline mr-6">
                            <a href="#" className="text-2xl hover:underline ">Newsletter</a>
                        </li>
                        <li className="inline mr-6">
                            <a href="#" className="text-2xl hover:underline ">Apps</a>
                        </li>
                        <li className="inline mr-6">
                            <a href="#" className="text-2xl hover:underline ">Privacy & Policy</a>
                        </li>
                    </ul>
                </div>
                <div className="widget col-span-full md:col-span-3 lg:col-span-3 lg:col-start-9 xl:col-start-10">
                    <h6 className="text-2xl">Download mobile apps</h6>
                    <ul className="mt-6 flex items-center space-x-6 divide-x divide-gray-500">
                        <li>
                            <div className="buttons space-y-4 grid">
                                <a href="#">
                                    <img src="../assets/media/google-play-badge.svg" alt="" />
                                </a>
                                <a href="#">
                                    <img src="../assets/media/appstore-button.svg" alt="" />
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="qr pl-6">
                                <img src="../assets/media/app_download_qr.png" alt="Download Mobile App QR" />
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="footer_bottom sm:flex items-center justify-between pt-10 md:pt-14 pb-10">
                <div className="copyright basis-1/2 text-2xl text-center sm:text-left">
                    <p>
                        Copyright &copy; 2023, SHIRONAM. All rights reserved.
                    </p>
                </div>
                <div className="footer_bottom_menu basis-1/2 space-x-7 text-2xl text-center sm:text-right">
                    <a href="#">About</a>
                    <a href="#">Advertise</a>
                    <a href="#">Privacy</a>
                    <a href="#">Policy</a>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer