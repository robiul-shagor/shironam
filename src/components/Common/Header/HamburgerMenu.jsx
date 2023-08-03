import { useState, useEffect, useContext} from 'react'
import HamburgerAccordian from './HamburgerAccordian';
import axios from '../../../api/axios';
import ThemeSwitcherMobile from './ThemeSwitcherMobile';
import Spinner from '../../Elements/Spinner';
import { UserContext } from '../../../App';
import { useLocation } from 'react-router-dom';

const HamburgerMenu = () => {
    const [hamburger, setHamburger] = useState(false);
    const [data, setData] = useState([]);
    const [activeAccordion, setActiveAccordion] = useState(null);
    const [loading, setLoading] = useState(true); 
    const { userLogin } = useContext( UserContext );
    const location = useLocation();

    const toggleAccordion = (index) => {
        setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
    };

    const handleHamburger = (e) => {
        e.preventDefault();
        setHamburger(!hamburger);
    };

    useEffect(() => {
        const handleDocumentClick = (e) => {
          const isSocialDropdown = e.target.closest('.cat_floating_sidebar');
          const isSocialTrigger = e.target.closest('.cat-sidebar-toggler');
          
      
          if (!isSocialDropdown && !isSocialTrigger) {
            setHamburger(false);
          }
        };
        document.body.addEventListener('click', handleDocumentClick);
        return () => {
            document.body.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    useEffect(() => {
        setHamburger(false);
    }, [location]);
  
    const getCategory = async(retryCount = 3, delay = 1000) => {
        const bearer_token = `Bearer ${userLogin.token}`;
        try {
            const config = {
                headers: {
                'Authorization': bearer_token
                }
            };

            await axios.get('/interest-list', config)
            .then(res => {
                setData(res.data.data);
            });
        } catch (error) {
            if (retryCount > 0 && error.response?.status === 429) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                getCategory(retryCount - 1, delay * 2); 
            } else if(error.response?.data?.message === 'Unauthenticated.' ) {
                const hasReloaded = localStorage.getItem("hasReloaded");
                if (!hasReloaded) {
                    localStorage.removeItem("userDetails");
                    localStorage.setItem("hasReloaded", "true");
                    // Reload the window only if it hasn't been reloaded before
                    window.location.reload();
                }
            } else {
                console.log(error);
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        getCategory();
    }, [])

  return (
    <li className="relative">
        <a href="#" onClick={handleHamburger} 
            className="cat-sidebar-toggler text-2xl border px-4 py-3 rounded-lg border-gray-400 dark:text-white" >
            <i className="fal fa-bars"></i>
        </a>

        { loading && <Spinner />}

        { hamburger && (
            <div className="cat_floating_sidebar fixed top-0 right-[-30rem] bottom-0 shadow-lg z-[1000] m-0 list-none rounded-lg bg-white transition-all duration-300 focus:outline-none p-12 text-[1.4rem] space-y-5 w-[30rem] dark:bg-[#272727] [&.active]:right-0 overflow-y-auto active" id="category_slide_dropdown">
                <div className="flex items-center justify-between border-b pb-4 mb-8">
                    <h3 className="font-2xl hidden md:block"></h3>
                    <ThemeSwitcherMobile />
                    <button className="close border px-4 py-2 rounded" onClick={()=> setHamburger(false)} >
                        <i className="fal fa-times"></i>
                    </button>
                </div>

                {data?.map((item, index) => (
                    <HamburgerAccordian 
                        key={index} 
                        data={item}
                        isOpen={ activeAccordion === index } 
                        toggleAccordion={() => toggleAccordion(index)}
                    />
                ))}
            </div>
        ) }        
    </li>
  )
}

export default HamburgerMenu