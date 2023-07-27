import { Link } from 'react-router-dom'
import {  useContext } from 'react'
import { UserContext } from '../../../App';

const LogoElement = () => {
  const { siteSetting } = useContext(UserContext);
  return (
    <div className="brand-logo text-center">
        <Link 
            to="/"
            className="inline-block max-[575px]:-ml-8"
        >
            <img src={`${siteSetting.base_url}${siteSetting.logo_light}`} className="max-[1199px]:w-[12rem] dark:hidden" alt="shironam.com" width="138" height="52" />
            <img src={`${siteSetting.base_url}${siteSetting.logo_dark}`} className="max-[1199px]:w-[12rem] hidden dark:inline-block" alt="shironam.com" width="138" height="52" />
        </Link>
    </div>
  )
}

export default LogoElement