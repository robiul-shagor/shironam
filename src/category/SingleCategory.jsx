import {React, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from '../api/axios'
import Header from '../components/Common/Header/Header';
import MainBody from '../components/Common/MainBody/MainBody'
import Footer from '../components/Common/Footer/Footer'
import MainCategory from '../components/Common/MainBody/MainCategory'

const SingleCategory = () => {
    const { category } = useParams();
    
    const [newsItem, setNewsItem ] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    useEffect(() => {
        const getData = async() => {
            const bearer_token = `Bearer ${userData.token}`;
            try {
                const config = {
                    headers: {
                      'Authorization': bearer_token
                    }
                };

                await axios.get('/news-list', config)
                .then(res => {
                    setNewsItem(res.data);
                    //console.log(res.data);
                });

            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [])

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const categoryData = Capitalize(category);

  return (
    <div className='home'>
        <Header />
            <MainCategory category={categoryData} type={'categories'} />
        <Footer />
    </div>
  )
}

export default SingleCategory