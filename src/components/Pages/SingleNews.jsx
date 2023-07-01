import {React, useState, useEffect, useContext} from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from 'axios'
import { UserContext } from '../../App'


function SingleNews() {
    const { langMode } = useContext(UserContext);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    const singleData = async(event)=> {
        try {

        } catch(e) {

        }
    }

    useEffect(()=> {
        
    }, [])

    return (
        <div className='single-news'>
            <Header />
            
            <div className='main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] max-[767px]:bg-[#EEEEEE] max-[767px]:dark:bg-dark'>
                
            </div>

            <Footer />
        </div>
    )
}

export default SingleNews