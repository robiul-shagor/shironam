import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api/axios'
import Header from '../components/Common/Header/Header';
import MainBody from '../components/Common/MainBody/MainBody'
import Footer from '../components/Common/Footer/Footer'
import MainCategory from '../components/Common/MainBody/MainCategory'

const SingleTags = () => {
    const { tags } = useParams();

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const categoryData = Capitalize(tags);
    
  return (
    <div className='home'>
        <Header />
            <MainCategory category={categoryData} type={'tags'} />
        <Footer />
    </div>
  )
}

export default SingleTags