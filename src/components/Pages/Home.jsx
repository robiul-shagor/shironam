import React, { useContext } from 'react'
import MainBody from '../Common/MainBody/MainBody'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import { UserContext } from '../../App'

const Home = () => {
  const {theme, setTheme} = useContext(UserContext);

  return (
    <div className='home'>
        <Header />
        <MainBody />
        <Footer />
    </div>
  )
}

export default Home