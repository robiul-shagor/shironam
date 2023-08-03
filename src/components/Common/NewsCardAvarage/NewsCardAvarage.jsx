import {React, useEffect,useContext } from 'react'
import { useState } from 'react';
import moment from 'moment';
import { UserContext } from '../../../App';
import NewsListNonUser from '../../../query/NewsListNonUser';
import { Link } from 'react-router-dom';
import SocialShare from '../Component/SocialShare';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '../../Elements/Spinner';

const NewsCardAvarage = () => {
    const [visiblePostId, setVisiblePostId] = useState(null);
    const { langMode } = useContext(UserContext);
    const getUserLang = langMode;
    const [social, setSocial] = useState(false)
    
    const [ query, setQuery ] = useState([]);
    const { loading, error, news } = NewsListNonUser(query)

    const socialHandle = (e, id) => {
        e.preventDefault();
        setSocial(prevSocial => (prevSocial === id ? null : id));
    }

    useEffect(() => {
        const handleDocumentClick = (e) => {
          const isSocialDropdown = e.target.closest('.social-dropdown');
          const isSocialTrigger = e.target.closest('.post-item li a');
      
          if (!isSocialDropdown && !isSocialTrigger) {
            setSocial(false);
          }
        };
      
        document.body.addEventListener('click', handleDocumentClick);
      
        return () => {
          document.body.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleScroll = () => {
        const postElements = document.getElementsByClassName('post-item');
        const windowHeight = window.innerHeight;
  
        for (let i = 0; i < postElements.length; i++) {
          const postElement = postElements[i];
          const rect = postElement.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= windowHeight;
          const getPosts = postElement.getAttribute('data-id');
  
          if (isVisible) {
            if( typeof getPosts !== 'undefined' ) {
                setVisiblePostId(Number(getPosts));
            }         
            break;
          }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className="space-y-8 lg:space-y-12 col-span-2">
            {news.length > 0 && news.map((newsData, index) => (
                <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" key={index} data-id={newsData.id}>
                    <div className={ newsData.ads_image ? 'post-body ads' : 'post-body' }>
                        { newsData.ads_image ? (
                            <a href={newsData.action_url ? newsData.action_url : '#'}>
                                <LazyLoadImage src={newsData.ads_image}
                                    alt=""
                                    placeholderSrc='/assets/media/placeholder.webp'
                                    className="thumbnail w-full object-cover"
                                    effect="blur"
                                />
                                { newsData.action_url && (
                                    <div className="action flex items-center px-8 py-4 text-base justify-between bg-theme_blue text-white">
                                        <span className="">{newsData.button_title}</span>
                                        <i className="fal fa-arrow-right -rotate-45"></i>
                                    </div>
                                ) }
                            </a>           
                        ) : (
                            <LazyLoadImage src={newsData.thumbnail}
                                alt=""
                                placeholderSrc='/assets/media/placeholder.webp'
                                className="thumbnail w-full object-cover"
                                effect="blur"
                            />
                        ) }

                        { newsData.ads_image ? (
                            <h1 className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme line-clamp-3 dark:text-white">
                                { getUserLang == 'BN' ? newsData.title : newsData.title}
                            </h1>
                        ) : (
                            <h1 className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme line-clamp-3 dark:text-white">
                                { getUserLang == 'BN' ? newsData.summary_bn : newsData.summary_en}
                            </h1>         
                        ) }                    
                        
                        { newsData.ads_image ? (
                            <ul className="flex items-center justify-between border-b-2 pt-7 pb-5 text-xl dark:text-white">
                                <li>
                                { getUserLang == 'BN' ? 'সৌজন্যে:' : 'Sponsored by:'} <a href="#" className="font-semibold">{newsData.sponsor}</a>
                                </li>
                            </ul>
                        ) : (
                            <ul className="flex items-center justify-between border-b-2 pt-7 pb-5 text-xl dark:text-white">
                                <li>
                                    <ul className="flex gap-6">
                                        <li>
                                            <i className="fal fa-clock"></i> &nbsp;
                                            { moment(new Date(newsData.datetime)).startOf('seconds').fromNow() }
                                        </li>
                                        <li>
                                            <Link to='/login' className='transition-all hover:text-theme'>
                                                { getUserLang == 'BN' ? 'বিস্তারিত' : 'Read More'}
                                                
                                                <i className="fal fa-arrow-up rotate-45"></i>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                { newsData.ads && (
                                    <li className="ads flex items-center">
                                         { getUserLang == 'BN' ? 'সৌজন্যে:' : 'Sponsored:'}: &nbsp;
                                        <a href={newsData.ads.action_url} className="inline-flex gap-x-2 items-center">
                                            <img src={newsData.ads.sponsor_image} alt="" />
                                            {newsData.ads.sponsor}
                                        </a>
                                    </li>
                                ) }

                                <li>
                                    <ul className="flex gap-6">
                                        <li className='relative'>
                                            <a href="#" className="transition-all hover:text-theme" onClick={(e)=> socialHandle(e, newsData.id)}>
                                                { getUserLang == 'BN' ? 'শেয়ার' : 'Share'}&nbsp;
                                                <i className="fal fa-share"></i>
                                            </a>
                                            {social === newsData.id && <SocialShare title={ getUserLang == 'BN' ? newsData.summary_bn : newsData.summary_en} url={`${window.location.href}/news/${newsData.id}`} />} 
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        ) }
                    </div>
                </div>
            ))}

            <div className='text-center'>{loading && <Spinner /> }</div>
            <div className='text-center'>{error && ( langMode == 'BN' ? 'Error' : 'ত্রুটি হচ্ছে...' )}</div>

            <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none} .tags-item:first-of-type{display: inline-flex}` }} />
            
            <div style={{ opacity: 0 }}>
                {visiblePostId && ( <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none}.tags-item:first-of-type{display: none}#tags-item-${visiblePostId}{display: inline-flex !important}` }} /> )}
            </div>
        </div>
    )
}

export default NewsCardAvarage