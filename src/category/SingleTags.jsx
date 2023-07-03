import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api/axios'
import Header from '../components/Common/Header/Header';
import MainBody from '../components/Common/MainBody/MainBody'
import Footer from '../components/Common/Footer/Footer'
import MainCategory from '../components/Common/MainBody/MainCategory'

const SingleTags = () => {
  const url_slug  = useParams();

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className='home'>
        <Header />
        <MainCategory category={capitalize(url_slug.tags)} type={'tags'} />
        <Footer />
    </div>
  )
}

export default SingleTags