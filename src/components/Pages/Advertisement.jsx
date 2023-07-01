import React from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

const Advertisement = () => {
  return (
    <div className='advertisement-wrapper'>
        <Header />
        <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
          <div className="container">
            <div className="max-w-[90rem] mx-auto">
                <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-10 md:mb-20 dark:text-white">
                    Advertise with Us
                </h2>
                <div className="space-y-8 border-l border-gray-300 dark:border-gray-500 pl-8 md:pl-12 dark:text-white">
                    <p>
                        <b>Introduction:</b>
                        Provide a brief introduction that explains the purpose of the Privacy & Policy section and reassures users about their privacy.
                    </p>
                    <p>
                        <b>Data Collection:</b>
                        Explain the types of data that may be collected from users, such as personal information, browsing behavior, or cookies. Describe the methods of data collection, including forms, cookies, or third-party services.
                    </p>
                    <p>
                        <b>Data Usage:</b>
                        Clearly outline how the collected data will be used. For a newspaper website, this may include purposes such as delivering personalized content, improving user experience, or sending newsletters.
                    </p>
                    <p>
                        <b>Data Sharing:</b>
                        If the newspaper website shares user data with third parties, disclose this information and specify the purposes for sharing. Examples might include advertising networks or analytics services.
                    </p>
                    <br />
                    <h3 className="font-bold text-[1.8rem] md:text-[2rem] leading-[1.45]">
                        Print Edition
                    </h3>
                    <address className="not-italic text-[1.5rem]">
                        Contact: <br/>
                        SHIRONAM, Advertising Sales  <br/>
                        BTTC Building (Level-03), 270/B,  <br/>
                        Tejgaon I/A, Dhaka-1208  <br/>
                        Copyright &copy; 2023, SHIRONAM. All rights reserved.
                    </address>

                    <br/>
                    <h3 className="font-bold text-[1.8rem] md:text-[2rem] leading-[1.45]">
                        Online Edition (SHIRONAM.com)
                    </h3>
                    <p>
                        Contact: <br />
                        +88 01896002363
                    </p>
                </div>
            </div>
          </div>
        </div>        
        <Footer />
    </div>
  )
}

export default Advertisement