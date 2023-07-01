import React from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

function PrivacyPolicy() {
  return (
    <div className='privecy-policy'>
        <Header />
        <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
          <div className="container">
            <div className="max-w-[90rem] mx-auto">
                <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-10 md:mb-20 dark:text-white">
                    Privacy & Policy
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
                    <p>
                        <b>Security Measures:</b>
                        Explain the security measures in place to protect user data from unauthorized access, data breaches, or misuse. This could include encryption, access controls, or regular security audits.
                    </p>
                    <p>
                        <b>User Rights:</b>
                        Inform users about their rights regarding their personal data. This may include the right to access, rectify, or delete their data, as well as the process for exercising these rights.
                    </p>
                    <p>
                        <b>Cookies and Tracking:</b>
                        If the website uses cookies or other tracking technologies, provide information about their usage and allow users to manage their cookie preferences.
                    </p>
                    <p>
                        <b>Legal Compliance:</b>
                        State the legal basis for data processing and compliance with relevant data protection laws, such as the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA).
                    </p>                    
                </div>
            </div>
          </div>
        </div>        
        <Footer />
    </div>
  )
}

export default PrivacyPolicy