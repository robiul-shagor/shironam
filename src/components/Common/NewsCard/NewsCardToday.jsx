import { useEffect, useContext} from 'react'
import axios from '../../../api/axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { UserContext } from '../../../App';

const NewsCardToday = () => {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const [newsItem, setNewsItem ] = useState([]);
    const [visiblePostId, setVisiblePostId] = useState(null);

    const { langMode } = useContext(UserContext);

    const getData = async() => {
        const bearer_token = `Bearer ${userData.token}`;
        try {
            const config = {
                headers: {
                  'Authorization': bearer_token
                }
            };

            await axios.get('/news-list?todays_news=1', config)
            .then(res => {
                setNewsItem(res.data);
            });

        } catch (e) {
            console.log(e);
        }
    };

    const handleScroll = () => {
        const postElements = document.getElementsByClassName('post-item');
        const windowHeight = window.innerHeight;
  
        for (let i = 0; i < postElements.length; i++) {
          const postElement = postElements[i];
          const rect = postElement.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= windowHeight;
  
          if (isVisible) {
            setVisiblePostId(Number(postElement.getAttribute('data-id')));
            break;
          }
        }
    };

    useEffect(() => {
        getData();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className="space-y-8 lg:space-y-12 col-span-2">
            {newsItem.length > 0 && newsItem.map((newsData, index) => (
                <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" key={index} data-id={newsData.id}>
                    <div className={ newsData.ads_image ? 'post-body ads' : 'post-body' }>
                        { newsData.ads_image ? (
                            <a href={newsData.action_url ? newsData.action_url : '#'}>
                                <img 
                                src={newsData.ads_image} 
                                alt="" 
                                className="thumbnail w-full object-cover" />
                                { newsData.action_url && (
                                    <div className="action flex items-center px-8 py-4 text-base justify-between bg-theme_blue text-white">
                                        <span className="">{newsData.button_title}</span>
                                        <i className="fal fa-arrow-right -rotate-45"></i>
                                    </div>
                                ) }
                            </a>           
                        ) : (
                            <a href="#">
                                <img 
                                src={newsData.thumbnail} 
                                alt="" 
                                className="thumbnail w-full object-cover" />
                            </a>
                        ) }

                        { !newsData.ads_image && (
                            <ul className="post-category flex text-xl mt-6 dark:text-white">
                                <li>
                                    <Link to={`/category/${newsData.category_en.toLowerCase()}`} className='text-theme'>
                                        #{ langMode == 'BN' ? newsData.category_bn : newsData.category_en}
                                    </Link>
                                </li>
                                {newsData.sub_category_en && (
                                    <li>
                                        { langMode == 'BN' ? newsData.sub_category_bn : newsData.sub_category_en}
                                    </li>
                                )}
                            </ul>
                        ) }

                        { newsData.ads_image ? (
                            <h1 className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme line-clamp-3 dark:text-white">
                                
                                {newsData.title}
                            </h1>
                        ) : (
                            <h1 className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme line-clamp-3 dark:text-white">
                                { langMode == 'BN' ? newsData.summary_bn : newsData.summary_en}
                            </h1>         
                        ) }                    
                        
                        { newsData.ads_image ? (
                            <ul className="flex items-center justify-between border-b-2 pt-7 pb-5 text-xl dark:text-white">
                                <li>
                                    Sponsored by: <a href="#" className="font-semibold">{newsData.sponsor}</a>
                                </li>
                                <li>
                                    <a href="#" className="transition-all hover:text-theme">
                                        Bookmark
                                        <i className="fal fa-bookmark"></i>
                                    </a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex items-center justify-between border-b-2 pt-7 pb-5 text-xl dark:text-white">
                                <li>
                                    <ul className="flex gap-6">
                                        <li>
                                            <i className="fal fa-clock"></i>
                                            { moment(new Date(newsData.publish_date)).startOf('hour').fromNow() }
                                        </li>
                                        <li>
                                            <a href="#" className="transition-all hover:text-theme">
                                                Read More
                                                <i className="fal fa-arrow-up rotate-45"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                { newsData.ads && (
                                    <li className="ads flex items-center">
                                        Sponsored: &nbsp;
                                        <a href={newsData.ads.action_url} className="inline-flex gap-x-2 items-center">
                                            <img src={newsData.ads.sponsor_image} alt="" />
                                            {newsData.ads.sponsor}
                                        </a>
                                    </li>
                                ) }

                                <li>
                                    <ul className="flex gap-6">
                                        <li>
                                            <a href="#" className="transition-all hover:text-theme">
                                                Share
                                                <i className="fal fa-share"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) }
                    </div>
                </div>
            ))}

            <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none} .tags-item:first-of-type{display: inline-flex}` }} />
            <div style={{opacity: 0}}>
                {visiblePostId && ( <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none}.tags-item:first-of-type{display: none}#tags-item-${visiblePostId}{display: inline-flex !important}` }} /> )}
            </div>
        </div>
    )
}

export default NewsCardToday