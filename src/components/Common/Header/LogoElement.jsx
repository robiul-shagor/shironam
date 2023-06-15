import React from 'react'
import { Link } from 'react-router-dom'

const LogoElement = () => {
  return (
    <div className="brand-logo text-center">
        <Link 
            to="/"
            className="inline-block max-[575px]:-ml-8"
        >
            <img src="/assets/media/logo.svg" className="max-[1199px]:w-[12rem] dark:hidden" alt="shironam.com" />
            <img src="../assets/media/logo-dark.svg" className="max-[1199px]:w-[12rem] hidden dark:inline-block" alt="shironam.com" />
        </Link>
    </div>
  )
}

export default LogoElement