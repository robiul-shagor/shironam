import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios';
import BreakingNews from '../components/Common/BreakingNews/BreakingNews';
import moment from 'moment';

const CategoryBody = () => {
    const [newsItem, setNewsItem ] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const bearer_token = `Bearer ${userData.token}`;
    const config = {
        headers: {
          'Authorization': bearer_token
        }
    };

    useEffect(() => {
        const getData = async() => {
            try {
                await axios.get('/category-list', config)
                .then(res => {
                    setNewsItem(res.data);
                });
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [])

    return (
        <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-8 pb-32">
            <div className="breaking_news_slider mb-12">
                <BreakingNews />
            </div>

            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10 clear-both dark:text-white">
                    { newsItem.map((item, index) => (    
                        item.name ? (    
                            <div className="news_category_item group relative shadow-lg dark:shadow-slate-100/10 rounded-xl overflow-hidden" key={index} data-news-id={item.id}>
                                <img 
                                    src={ item.category_image } 
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
                                            {item.view}
                                        </li>
                                        <li className="ml-auto leading-none">
                                            <i className="fal fa-arrow-up rotate-45"></i>
                                        </li>
                                    </ul>
                                </div>
                                <Link to={`/category/${item.slug}`} className='absolute inset-0 link-stretched'/>
                            </div>     
                        ) : (
                            ( item.placement_title === "Single Category") ? (
                                <div className="news_category_item group relative shadow-lg dark:shadow-slate-100/10 rounded-xl overflow-hidden" key={index} data-ads-id={item.id}>
                                    <img src={item.media[0].original_url} className="w-full h-[180px] sm:h-[220px] object-cover object-center" alt=" Title" />

                                    <div className="text-info relative">
                                        <div className="action flex items-center px-8 py-4 text-[1.4rem] justify-between bg-theme_blue text-white">
                                            <span className="leading-normal">{item.button_title}</span>
                                            <i className="fal fa-arrow-right -rotate-45"></i>
                                        </div>
                                        <ul className="flex items-center justify-between py-6 text-xl px-8">
                                            <li>
                                                Sponsored by: <a href="#" className="font-semibold">{item.sponsor}</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <a href={item.action_url} className="absolute inset-0 link-stretched"></a>
                                </div>
                            ) : (
                                <div className="news_category_item ads ads-4in1 overflow-hidden col-span-2 row-span-2" key={index} data-ads-id={item.id}>
                                    <div className="grid grid-cols-2 relative gap-8 sm:gap-10">
                                        { (item.media[0].original_url) && (
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
                        )
                    )) }
                    
                </div>
            </div>
        </div>
    );
};

export default CategoryBody