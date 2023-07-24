import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../../api/axios';

const LogoElement = () => {
  const [ loading, setLoading ] = useState( true );
  const getCategory = async(retryCount = 3, delay = 1000) => {
    try {
        await axios.get('/site-settings', {})
        .then(res => {
            console.log( res )
        });
    } catch (error) {
        if (retryCount > 0 && error.response?.status === 429) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            getCategory(retryCount - 1, delay * 2); 
        } else {
            console.log(error);
            setLoading(false);
        }
    } finally {
        setLoading(false);
    }
  };

  useEffect(()=> {
      //getCategory();
  }, [])

  return (
    <div className="brand-logo text-center">
        <Link 
            to="/"
            className="inline-block max-[575px]:-ml-8"
        >
            <img src="/assets/media/logo.svg" className="max-[1199px]:w-[12rem] dark:hidden" alt="shironam.com" />
            <img src="/assets/media/logo-dark.svg" className="max-[1199px]:w-[12rem] hidden dark:inline-block" alt="shironam.com" />
        </Link>
    </div>
  )
}

export default LogoElement