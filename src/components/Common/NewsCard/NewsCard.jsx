import {React, useEffect, useContext, useRef, useCallback} from 'react'
import axios from '../../../api/axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { UserContext } from '../../../App';
import NewsListQuery from '../../../query/NewsListQuery';


const NewsCard = () => {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const [visiblePostId, setVisiblePostId] = useState(null);
    const [visibleAdsId, setVisibleAdstId] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {
        loading, error, news, hasMores
    } = NewsListQuery(query, pageNumber)

    const newsObserver = useRef(null);
    const observer = useRef()

    const lastNewsElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && hasMores) {     
            setPageNumber(prevPageNumber => prevPageNumber + 1)
          }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMores])    
    
    const { langMode } = useContext(UserContext);

    const bearer_token = `Bearer ${userData.token}`;
    
    // Handle Bookmark
    const bookmarkHandle = async(event) => {
        event.preventDefault();
        const currentItem = event.currentTarget;
        const bookmarkId = currentItem.getAttribute('data-bookmark');
        const bookmarks = parseInt(bookmarkId);
                
        try {           
            await axios.post('/bookmark-news', {news_id: bookmarks}, {headers: {
                'Authorization': bearer_token
            }})
            .then(res => {    
                if( res.data.status == 'Success' ) {
                    currentItem.className = 'success';
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    // Handle Source Click
    const clickSource = async(event) => {
        event.preventDefault();

        const currentItem = event.currentTarget.getAttribute('data-source');
        const currentURL = event.currentTarget.getAttribute('href');
        try {           
            await axios.post('/source-click', {news_id: currentItem}, {headers: {
                'Authorization': bearer_token
            }})
            .then(res => {
                if( res.data.status == "Success" ) {
                    window.open(currentURL, '_blank');
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    // Handle click ads
    const clickAds = async(event) => {
        event.preventDefault();
        const currentItem = event.currentTarget.getAttribute('data-ads');
        const currentURL = event.currentTarget.getAttribute('href')
        try {           
            await axios.post('/ads-click', {ads_id: currentItem}, {headers: {
                'Authorization': bearer_token
            }})
            .then(res => {
                if( res.data.status == "Success") {
                    window.open(currentURL, '_blank');
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    // Handle View data
    const viewData = (view) => {
        try {           
            axios.post('/view-news', {news_id: view}, {headers: {
                'Authorization': bearer_token
            }})
        } catch (e) {
            console.log(e);
        }
    }
    
    // Handle scroll
    let scrolled = false;
    const handleScroll = () => {
        const postElements = document.getElementsByClassName('post-item');
        const windowHeight = window.innerHeight;
  
        for (let i = 0; i < postElements.length; i++) {
          const postElement = postElements[i];
          const rect = postElement.getBoundingClientRect();
          const isVisible = rect.top >= 0 && rect.bottom <= windowHeight;
          const getAds = postElement.getAttribute('data-ads');
          const getPosts = postElement.getAttribute('data-id');
  
          if (isVisible) {
            if( typeof getPosts !== 'undefined' ) {
                setVisiblePostId(Number(getPosts));
                if (!scrolled && window.scrollY > 0) {
                    scrolled = true;
                    viewData(Number(getPosts));
                }
            }         
            if( typeof getAds !== 'undefined' ) {
                setVisibleAdstId(Number(getAds));
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
            {news.length > 0 && news.map((newsData, index) => {
                if (news.length === index + 1) {
                    return <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" ref={lastNewsElementRef} key={index} data-id={ !newsData.ads_image ? newsData.id : ''} data-ads={newsData.ads_image ? newsData.id : ''}>
                        <div className={ newsData.ads_image ? 'post-body ads' : 'post-body' } ref={newsObserver}>
                            { newsData.ads_image ? (
                                <a href={newsData.action_url ? newsData.action_url : '#'} onClick={clickAds} data-ads={newsData.id}>
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
                                <a href={newsData.source}>
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
                                        { langMode == 'BN' ? 'সৌজন্যে:' : 'Sponsored by:'} <a href="#" className="font-semibold" onClick={clickAds} data-ads={newsData.id}>{newsData.sponsor}</a>
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
                                                <a href={newsData.source} className="transition-all hover:text-theme" data-source={newsData.id} onClick={clickSource}>
                                                    { langMode == 'BN' ? 'বিস্তারিত' : 'Read More'}
                                                    <i className="fal fa-arrow-up rotate-45"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    { newsData.ads && (
                                        <li className="ads flex items-center">
                                            { langMode == 'BN' ? 'স্পন্সর:' : 'Sponsored:'} &nbsp;
                                            <a href={newsData.ads.action_url} className="inline-flex gap-x-2 items-center">
                                                <img src={newsData.ads.sponsor_image} alt="" />
                                                {newsData.ads.sponsor}
                                            </a>
                                        </li>
                                    ) }

                                    <li>
                                        <ul className="flex gap-6">
                                            <li>
                                                <a href="#" onClick={bookmarkHandle} className={`transition-all hover:text-theme bookmark ${newsData.book_marks && 'warning'}`} data-bookmark={newsData.id}>
                                                    { langMode == 'BN' ? 'বুকমার্ক' : 'Bookmark'}
                                                    <i className="fal fa-bookmark"></i>
                                                </a>
                                            </li>
                                            <li className='relative'>
                                                <a href="#" className="transition-all hover:text-theme">
                                                    { langMode == 'BN' ? 'শেয়ার' : 'Share'}
                                                    <i className="fal fa-share"></i>
                                                </a>
                                                <ul className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute bottom-5 right-0 social-share'>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            ) }
                        </div>
                    </div>
                } else {
                    return <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" key={index} data-id={ !newsData.ads_image ? newsData.id : ''} data-ads={newsData.ads_image ? newsData.id : ''} >
                        <div className={ newsData.ads_image ? 'post-body ads' : 'post-body' } ref={newsObserver} >
                            { newsData.ads_image ? (
                                <a href={newsData.action_url ? newsData.action_url : '#'} onClick={clickAds} data-ads={newsData.id}>
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
                                <a href={newsData.source}>
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
                                        { langMode == 'BN' ? 'সৌজন্যে:' : 'Sponsored by:'} <a href="#" className="font-semibold" onClick={clickAds} data-ads={newsData.id}>{newsData.sponsor}</a>
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
                                                <a href={newsData.source} className="transition-all hover:text-theme" data-source={newsData.id} onClick={clickSource}>
                                                    { langMode == 'BN' ? 'বিস্তারিত' : 'Read More'}
                                                    <i className="fal fa-arrow-up rotate-45"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>

                                    { newsData.ads && (
                                        <li className="ads flex items-center">
                                            { langMode == 'BN' ? 'স্পন্সর:' : 'Sponsored:'} &nbsp;
                                            <a href={newsData.ads.action_url} className="inline-flex gap-x-2 items-center">
                                                <img src={newsData.ads.sponsor_image} alt="" />
                                                {newsData.ads.sponsor}
                                            </a>
                                        </li>
                                    ) }

                                    <li>
                                        <ul className="flex gap-6">
                                            <li>
                                                <a href="#" onClick={bookmarkHandle} className={`transition-all hover:text-theme bookmark ${newsData.book_marks && 'warning'}`} data-bookmark={newsData.id}>
                                                    { langMode == 'BN' ? 'বুকমার্ক' : 'Bookmark'}
                                                    <i className="fal fa-bookmark"></i>
                                                </a>
                                            </li>
                                            <li className='relative'>
                                                <a href="#" className="transition-all hover:text-theme">
                                                    { langMode == 'BN' ? 'শেয়ার' : 'Share'}
                                                    <i className="fal fa-share"></i>
                                                </a>
                                                <ul className='z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute bottom-5 right-0 social-share'>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            ) }
                        </div>
                    </div> 
                }
            })}

            <div>{loading && ( langMode == 'BN' ? 'লোড হচ্ছে...' : 'Loading...')}</div>
            <div>{error && ( langMode == 'BN' ? 'Error' : 'ত্রুটি হচ্ছে...' )}</div>

            <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none} .tags-item:first-of-type{display: inline-flex}` }} />
            <div style={{opacity: 0}}>
                {visiblePostId && ( <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none}.tags-item:first-of-type{display: none}#tags-item-${visiblePostId}{display: inline-flex !important}` }} /> )}
            </div>
        </div>
    )
}

export default NewsCard