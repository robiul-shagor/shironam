import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios';
import BreakingNews from '../components/Common/BreakingNews/BreakingNews';
import moment from 'moment';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import 'swiper/css'

const CategoryBody = () => {
    const [newsItem, setNewsItem ] = useState([]);
    const [newsSample, setNewsSample ] = useState([]);
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

                axios.get('/category-list', config)
                .then(res => {
                    setNewsItem(res.data);
                    //console.log(res.data);
                });

                axios.get('/news-list', config)
                .then(res => {
                    setNewsSample(res.data);
                    //console.log(res.data);
                });

            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [])

    const startIndex = 0; // Start index of the range (inclusive)
    const endIndex = 4; // End index of the range (exclusive)
    const itemsToShow = newsSample.slice(startIndex, endIndex);

    return (
        <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-8 pb-32">
            <div className="breaking_news_slider mb-12">
                <BreakingNews navigation="false" />

                <div className="container">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={2}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          pagination={{
                            clickable: true,
                          }}
                          navigation={true}
                          modules={[Autoplay, Pagination, Navigation]}
                        >
                        { itemsToShow.map( (swiperData, index) => (
                            <SwiperSlide key={index}>
                                <div className="group breaking-news-item relative before:content-[''] before:absolute before:inset-0  before:bg-gradient-to-b before:from-transparent before:to-black before:pointer-events-none before:z-[1] overflow-hidden">
                                    <img 
                                        src={swiperData.thumbnail} 
                                        alt="" 
                                        className="news-thumbnail w-full object-cover transition duration-500 transform group-hover:scale-105"
                                        />
                                    <p className="news_title text-white text-3xl lg:font-medium bottom-0 absolute p-6 z-[2]">
                                        {swiperData.summary_en}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ) ) }
                    </Swiper>
                </div>
            </div>

            <div className="container">
                <ul className="inline-flex flex-wrap gap-[.6rem] sm:gap-6 pt-5 lg:pt-10 mb-10">
                    <li>
                        <Link to='/' className='current [&.current]:bg-theme [&.current]:border-theme [&.current]:text-white border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-th-large"></i> &nbsp;
                            News Feed
                        </Link>
                    </li>
                    <li>
                        <Link to='/today-news' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-newspaper"></i> &nbsp;
                            Today News
                        </Link>
                    </li>
                    <li>
                        <Link to='/breaking-news' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-bullhorn -rotate-[30deg]"></i> &nbsp;
                            Breakings
                        </Link>
                    </li>
                </ul>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 clear-both dark:text-white">
                    { newsItem.map((item, index) => (    
                        item.name ? (    
                            <div className="news_category_item group relative shadow-lg dark:shadow-slate-100/10 rounded-xl overflow-hidden" key={index}>
                                <img 
                                    src={item.category_image } 
                                    className="w-full h-[180px] sm:h-[220px] object-cover object-center" 
                                    alt=""/>

                                <div className="text-info px-4 sm:px-6 py-6 relative">
                                    <h3 className="text-3xl font-semibold group-hover:text-theme">
                                        #{item.name}
                                    </h3>
                                    <span className="unread_post bg-theme text-white text-xl w-10 h-10 rounded-full flex items-center justify-center absolute -top-6 right-4 font-bold" title="Unread Posts">{item.news}</span>

                                    <ul className="flex gap-5 mt-4 items-end">
                                        <li className="text-xl">
                                            <i className="fal fa-clock"></i>
                                            { moment(new Date(item.created_at)).startOf('hour').fromNow() }
                                        </li>
                                        <li className="text-xl">
                                            <i className="far fa-eye"></i>
                                            2
                                        </li>
                                        <li className="ml-auto leading-none">
                                            <i className="fal fa-arrow-up rotate-45"></i>
                                        </li>
                                    </ul>
                                </div>
                                <Link to={`/category/${item.slug}`} className='absolute inset-0 link-stretched'/>
                            </div>     
                        ) : (
                            <div className="news_category_item ads ads-4in1 overflow-hidden col-span-2 row-span-2" key={index}>
                                <div className="grid grid-cols-2 relative gap-8 sm:gap-10">
                                    { item.media[0].original_url && (
                                        <div className="rounded-xl overflow-hidden">
                                            <a href={item.action_url} className="stretched-link">
                                                <img src={item.media[0].original_url} alt=""/>
                                            </a>
                                        </div>
                                    ) }                
                                    { item.media[1].original_url && (
                                        <div className="rounded-xl overflow-hidden">
                                            <img src={item.media[1].original_url} alt=""/>
                                        </div>
                                    ) }                 
                                    
                                    { item.media[2].original_url && (
                                        <div className="rounded-xl overflow-hidden">
                                            <img src={item.media[2].original_url} alt=""/>
                                        </div>
                                    ) }          
                                    
                                    { item.media[3].original_url && (         
                                        <div className="relative rounded-xl overflow-hidden">
                                            <img src={item.media[3].original_url} alt=""/>
                                            <div className="absolute bottom-0 left-0 right-0 action flex items-center px-8 py-4 text-[1.4rem] justify-between text-white z-[1] before:content-[''] before:absolute before:inset-0 before:backdrop-blur-2xl before:-z-[1]">
                                                <span className="leading-normal">{ item.button_title }</span>
                                                <i className="fal fa-arrow-right -rotate-45"></i>
                                            </div>
                                        </div>
                                    ) }

                                </div>
                            </div>
                        )
                    )) }
                    
                </div>
            </div>
        </div>
    );
};

export default CategoryBody