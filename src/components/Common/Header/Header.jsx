import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../../App';
import ThemeSwitcher from './ThemeSwitcher';
import DateToday  from './DateToday';
import LogoElement from './LogoElement';
import SearchBtn from './SearchBtn';
import Notification from './Notification';
import UserData from './UserData';
import LanguageSwitcher from './LanguageSwitcher';
import HamburgerMenu from './HamburgerMenu';

const Header = () => {
  
  const { userLogin, setUserLogin } = useContext(UserContext);

  const { langMode } = useContext(UserContext);
  
  const userData = JSON.parse(sessionStorage.getItem("userDetails"));

  const navigate = useNavigate();
 
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-white py-6 shadow-md shadow-black/10 z-[1024] dark:bg-[#272727]">
        <div className="container md:flex justify-between md:items-center">
            <LogoElement />

            <DateToday />

            <div className="right_nav_controls self-center max-[767px]:-mt-8">
                <ul className="flex gap-6 flex-row-reverse max-lg:justify-between md:flex-row md:gap-14 max-[575px]:pr-4 dark:text-white">
                    { userData && <SearchBtn /> }

                    { userData && <Notification /> }
                    
                    <ThemeSwitcher />

                    { userData && <UserData /> }

                    { !userData && (
                        <li className="hidden xl:block">
                            <Link to='/login' className='text-2xl dark:text-white'>
                                <i className="fas fa-user"></i>
                                <span>{ langMode == 'BN' ? 'লগইন' : 'Login'}</span>
                            </Link>
                        </li>
                    ) }

                    <LanguageSwitcher />

                    { userData && <HamburgerMenu /> }
                </ul>
            </div>
        </div>
    </header>
  )
}

export default Header