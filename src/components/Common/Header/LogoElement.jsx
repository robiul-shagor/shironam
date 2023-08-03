import { Link } from 'react-router-dom'
import {  useContext } from 'react'
import { UserContext } from '../../../App';

const LogoElement = () => {
  const { siteSetting, baseURL } = useContext(UserContext);
  return (
    <div className="brand-logo text-center">
        <Link 
            to="/"
            className="inline-block"
        >
            <img src={`${baseURL}/${siteSetting.logo_light}`} className="max-[1199px]:w-[12rem] dark:hidden" alt="shironam.com" width="138" height="52" />
            <img src={`${baseURL}/${siteSetting.logo_dark}`} className="max-[1199px]:w-[12rem] hidden dark:inline-block" alt="shironam.com" width="138" height="52" />
        </Link>
    </div>
  )
}

export default LogoElement