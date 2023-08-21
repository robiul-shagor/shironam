import { Link } from 'react-router-dom'
import {  useContext } from 'react'
import { UserContext } from '../../../App';


const LogoElement = () => {
  const { siteSetting, baseURL } = useContext(UserContext);
  const isHomepage = window.location.pathname === '/';

  const handleClick = () => {
    if (isHomepage) {
      window.location.reload();
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Optional, adds smooth scrolling animation
      });      
    }
  };

  return (
    <div className="brand-logo text-center" onClick={handleClick}>
        <Link 
            to="/"
            className="inline-block max-[575px]:-ml-8"
        >
            {siteSetting?.logo_light && (<img src={`${baseURL}${siteSetting.logo_light}`} className="max-[1199px]:w-[12rem] dark:hidden" alt="shironam.com" width="138" height="52" />)} 
            {siteSetting?.logo_dark && (<img src={`${baseURL}${siteSetting.logo_dark}`} className="max-[1199px]:w-[12rem] hidden dark:inline-block" alt="shironam.com" width="138" height="52" />)}  
        </Link>
    </div>
  )
}

export default LogoElement