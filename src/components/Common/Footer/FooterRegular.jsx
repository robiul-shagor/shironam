import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../../App'
import { Link } from 'react-router-dom';

function FooterRegular() {
    const  { langMode, footerSetting } = useContext(UserContext);
    return (
        <>      
            <div className='widget col-span-full md:col-span-3 lg:col-span-3 lg:col-start-9 xl:col-start-10 mt-auto pb-2'>
                <h6 className="text-2xl dark:text-white">{langMode == 'BN' ? footerSetting.qr_title_bn : footerSetting.qr_title_en}</h6>

                <ul className="mt-6 flex items-center space-x-6 divide-x divide-gray-500">
                    <li>
                        <div className="buttons space-y-4 grid">
                            <a href={footerSetting.download_google_apps_button} target='_blank'>
                                <img src="/assets/media/google-play-badge.svg" alt="" />
                            </a>
                            <a href={footerSetting.download_apple_button}  target='_blank'>
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

                <hr className="my-6 mt-8 dark:border-[#646464]"></hr>

                <p className="text-[1.4rem]">
                    <Link to='/about-us' className='inline-block dark:text-[#a5a5a5] dark:hover:text-white transition-all'>{langMode == 'BN' ? 'আমাদের সম্পর্কে' : 'About Us'}</Link>
                    &nbsp;-&nbsp; 
                    <Link to='/advertisement' className='inline-block dark:text-[#a5a5a5] dark:hover:text-white transition-all'>{langMode == 'BN' ? 'বিজ্ঞাপন' : 'Advertisement'}</Link>
                    &nbsp;-&nbsp; 
                    <Link to='/privacy-policy' className='inline-block dark:text-[#a5a5a5] dark:hover:text-white transition-all'>{langMode == 'BN' ? 'গোপনীয়তা নীতি' : 'Privacy & Policy'}</Link>
                    &nbsp;-&nbsp;
                    <Link to='/contact-us' className='inline-block dark:text-[#a5a5a5] dark:hover:text-white transition-all'>{langMode == 'BN' ? 'যোগাযোগ করুন' : 'Contact Us'}</Link>
                </p>

                <p className="text-[1.4rem] dark:text-[#a5a5a5]">
                    {langMode == 'BN' ? footerSetting.copy_right_bn : footerSetting.copy_right_en}
                </p>
            </div>
        </>
    )
}

export default FooterRegular