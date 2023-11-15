import { useState, useEffect, useContext } from 'react'
import LoginModal from '../Component/LoginModal';

function FooterModal() {
    const [showModal, setShowModal] = useState(false);

    const userData = JSON.parse(localStorage.getItem("userDetails"));
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
        const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        const scrollPosition = windowHeight + scrollTop;

        if (scrollPosition >= (documentHeight - 100 ) ) {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    };

    return (
        <>
            { ( userData == null  && showModal ) && (
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
        </>
    )
}

export default FooterModal