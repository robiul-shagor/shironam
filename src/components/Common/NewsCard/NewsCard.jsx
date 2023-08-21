import { useEffect, useContext, useRef, useCallback} from 'react'
import axios from '../../../api/axios'
import { useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import moment from 'moment';
import { UserContext } from '../../../App';
import NewsListQuery from '../../../query/NewsListQuery';
import SocialShare from '../Component/SocialShare';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Spinner from '../../Elements/Spinner';

const NewsCard = () => {
    const [visiblePostId, setVisiblePostId] = useState(null);
    const [visibleId, setVisibleId] = useState(null);
    const [visibleAdsId, setVisibleAdstId] = useState(null);
    const [query, setQuery] = useState('')
    const [type, setType] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [social, setSocial] = useState(false)
    const [routerChanged, setRouterChanged] = useState(false)

    const { category, subCategory, tags } = useParams()
    const { pathname } = useLocation()
    const location = useLocation()
    const { langMode } = useContext(UserContext);
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    const bearer_token = `Bearer ${userData.token}`;

    // Make lowercase
    const makeLowercase = ( item ) => {
        return item.split(" ").join("-").toLowerCase()
    }

    // Set which type of event is it
    useEffect(() => {
        if (typeof subCategory !== 'undefined') {
            setQuery(subCategory);
            setType('subcategory');
        } else if (typeof category !== 'undefined') {
            setQuery(category);
            setType('category');
        } else if (typeof tags !== 'undefined') {
            setQuery(tags);
            setType('tags');
        } else if (typeof pathname !== 'undefined' && pathname == "/breaking-news") {
            setQuery('breaking-news');
            setType('breaking-news');
        } else if (typeof pathname !== 'undefined' && pathname == "/today-news") {
            setQuery('today-news');
            setType('today-news');
        } else {
            setQuery('all');
            setType('all');
        }
    }, [location, category, subCategory, tags, query]); 

    //News Query
    const {
        loading, error, news, hasMores, noMore, noPosts
    } = NewsListQuery(query, pageNumber, type)

    // Change with router changed
    useEffect(() => {
        setRouterChanged(true);
        setPageNumber(1);
    }, [location]);

    // Use observer for infinity scroll
    const observer = useRef()
    const lastNewsElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if ( entries[0].isIntersecting && hasMores) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMores, routerChanged])    
     
    // Handle Bookmark
    const bookmarkHandle = async(event) => {
        event.preventDefault();
        const currentItem = event.currentTarget;
        const bookmarkId = currentItem.getAttribute('data-bookmark');
        const bookmarks = parseInt(bookmarkId);
        
                
        try {           
            const isBookmarked = currentItem.classList.contains('success');
            if( isBookmarked ) {
                await axios.post('/bookmark-remove', { news_id: bookmarks }, { headers: { 'Authorization': bearer_token } })
                .then((res) => {
                  if (res.data.status === 'Success') {
                    currentItem.classList.remove('success');
                  }
                });
            } else {
                await axios.post('/bookmark-news', {news_id: bookmarks}, {headers: {
                    'Authorization': bearer_token
                }})
                .then(res => {    
                    console.log(res)
                    if( res.data.status == 'Success' ) {
                        currentItem.className = 'success';
                    }
                });
            }
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
    
    // Handle View ads
    const viewAdsData = (view) => {
        try {           
            axios.post('/view-ads', {ads_id: view}, {headers: {
                'Authorization': bearer_token
            }})
        } catch (e) {
            console.log(e);
        }
    }

    // Handle Social dropdown
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
      
    // Handle scroll
    let prevScrollY = window.scrollY; 
    const handleScroll = () => {
        const postElements = document.querySelectorAll('.post-item');
        const windowHeight = window.innerHeight;
        const threshold = 0.5;
      
        let visiblePostId = null;
        let visibleAdstId = null;
        let scrolled = false;
       
      
        for (let i = 0; i < postElements.length; i++) {
          const postElement = postElements[i];
          const { top, bottom } = postElement.getBoundingClientRect();
          const isVisible =
            (top >= 0 && bottom <= windowHeight) ||
            (top < 0 && bottom >= windowHeight * threshold) ||
            (bottom > windowHeight && top <= windowHeight * (1 - threshold));
      
          const postId = postElement.dataset.id;
          const adstId = postElement.dataset.ads;

          if (isVisible) {
            if (postId) {
              visiblePostId = Number(postId);
              if (window.scrollY > prevScrollY) {
                scrolled = true;
                setVisibleId(visiblePostId);
              }
            }
            if (adstId) {
              if (window.scrollY > prevScrollY) {
                scrolled = true;
                setVisibleAdstId(Number(adstId));
              }
            }
            break;
          }
        }

        prevScrollY = window.scrollY;
      
        // Perform state updates outside the loop
        if (visiblePostId !== null) {
          setVisiblePostId(visiblePostId);          
        }
        
        if (visibleAdsId !== null) {
          setVisibleAdstId(visibleAdsId);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    
    // Set Visable news ID
    useEffect(() => {
        visibleId && viewData(visibleId);
        visibleAdsId && viewAdsData(visibleAdsId);
    }, [visibleId, visibleAdsId ])

    return (
        <div className="space-y-8 lg:space-y-12 col-span-2">   
            {news?.map((newsData, index) => {
                if (news.length === index + 1) {
                    return <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" ref={lastNewsElementRef} key={index} data-id={ !newsData.ads_image ? newsData.id : ''} data-ads={newsData.ads_image ? newsData.id : ''}>
                        <div className={ newsData.ads_image ? 'post-body ads' : 'post-body' }>
                            { newsData.ads_image ? (
                                <a href={newsData.action_url ? newsData.action_url : '#'} onClick={clickAds} data-ads={newsData.id}>
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
                                <a href={newsData.source}>
                                    <LazyLoadImage src={newsData.thumbnail}
                                        alt=""
                                        placeholderSrc='/assets/media/placeholder.webp'
                                        className="thumbnail w-full object-cover"
                                        effect="blur"
                                    />
                                </a>
                            ) }

                            { !newsData.ads_image && (
                                <ul className="post-category flex text-xl mt-6 dark:text-white">
                                    <li>
                                        <Link to={`/category/${newsData.category_en?.toLowerCase()}`} className='text-theme'>
                                            #{ langMode == 'BN' ? newsData.category_bn : newsData.category_en}
                                        </Link>
                                    </li>
                                    {newsData.sub_category_en && (
                                        <li>
                                            <Link to={`/category/${makeLowercase(newsData.category_en)}/${makeLowercase(newsData.sub_category_en)}`}>
                                                { langMode == 'BN' ? newsData.sub_category_bn : newsData.sub_category_en}
                                            </Link>
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
                                <ul className={`flex flex-wrap items-center justify-between border-b-2 pt-7 pb-5 text-xl dark:text-white ${ newsData.ads ? 'ads-with-list' : '' }`}>
                                    <li>
                                        <ul className="flex gap-6">
                                            <li>
                                                <i className="fal fa-clock"></i>&nbsp;
                                                { moment(new Date(newsData.publish_date)).startOf('seconds').fromNow() }
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
                                                <img src={newsData.ads.sponsor_image} alt="" loading="lazy" />
                                                {newsData.ads.sponsor}
                                            </a>
                                        </li>
                                    ) }

                                    <li>
                                        <ul className="flex gap-6">
                                            <li>
                                                <a href="#" onClick={bookmarkHandle} className={`transition-all hover:text-theme bookmark ${newsData.book_marks && 'warning'}`} data-bookmark={newsData.id}>
                                                    <span>{ langMode == 'BN' ? 'বুকমার্ক' : 'Bookmark'}
                                                    &nbsp;</span>
                                                    <i className="fal fa-bookmark"></i>
                                                </a>
                                            </li>
                                            <li className='relative'>
                                                <a href="#" className="share-news transition-all hover:text-theme" onClick={(e)=> socialHandle(e, newsData.id)}>
                                                    <span>{ langMode == 'BN' ? 'শেয়ার' : 'Share'}
                                                    &nbsp;</span>
                                                    <i className="fal fa-share"></i>
                                                </a>
                                                {social === newsData.id && <SocialShare title={ langMode == 'BN' ? newsData.summary_bn : newsData.summary_en} url={`${window.location.href}${newsData.id}`} />}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            ) }
                        </div>
                    </div>
                } else {
                    return <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]" key={index} data-id={ !newsData.ads_image ? newsData.id : ''} data-ads={newsData.ads_image ? newsData.id : ''} >
                        <div className={ newsData.ads_image ? 'post-body ads' : 'post-body' } >
                            { newsData.ads_image ? (
                                <a href={newsData.action_url ? newsData.action_url : '#'} onClick={clickAds} data-ads={newsData.id}>
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
                                <a href={newsData.source}>
                                    <LazyLoadImage src={newsData.thumbnail}
                                        alt=""
                                        placeholderSrc='/assets/media/placeholder.webp'
                                        className="thumbnail w-full object-cover"
                                        effect="blur"
                                    />
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
                                            <Link to={`/category/${makeLowercase(newsData.category_en)}/${makeLowercase(newsData.sub_category_en)}`}>
                                                { langMode == 'BN' ? newsData.sub_category_bn : newsData.sub_category_en}
                                            </Link>
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
                                <ul className={`flex flex-wrap items-center justify-between border-b-2 pt-7 pb-5 text-xl dark:text-white ${ newsData.ads ? 'ads-with-list' : '' }`}>
                                    <li>
                                        <ul className="flex gap-6">
                                            <li>
                                                <i className="fal fa-clock"></i>&nbsp;
                                                { moment(new Date(newsData.publish_date)).startOf('seconds').fromNow() }
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
                                                <img src={newsData.ads.sponsor_image} alt="" loading="lazy" />
                                                {newsData.ads.sponsor}
                                            </a>
                                        </li>
                                    ) }

                                    <li>
                                        <ul className="flex gap-6">
                                            <li>
                                                <a href="#" onClick={bookmarkHandle} className={`transition-all hover:text-theme bookmark ${newsData.book_marks && 'warning'}`} data-bookmark={newsData.id}>
                                                    <span>{ langMode == 'BN' ? 'বুকমার্ক' : 'Bookmark'}
                                                    &nbsp;</span>
                                                    <i className="fal fa-bookmark"></i>
                                                </a>
                                            </li>
                                            <li className='relative'>
                                                <a href="#" className="share-news transition-all hover:text-theme" onClick={(e)=> socialHandle(e, newsData.id)}>
                                                    <span>{ langMode == 'BN' ? 'শেয়ার' : 'Share'}
                                                    &nbsp;</span>
                                                    <i className="fal fa-share"></i>
                                                </a>
                                                {social === newsData.id && <SocialShare title={ langMode == 'BN' ? newsData.summary_bn : newsData.summary_en} url={`${window.location.href}/news/${newsData.id}`} />}
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            ) }
                        </div>
                    </div> 
                }
            }) }

            <div>
                {loading && news.length !== 0 && <Spinner />}
                {loading && news.length === 0 && <Spinner />}
            </div>
            
            <div className='text-center dark:text-white'>{noMore && ( langMode == 'BN' ? 'আপনি আপনার ফিডের শেষ প্রান্তে পৌঁছে গেছেন.' : 'You have reached the end of your feed.' )}</div>
            <div className='text-center dark:text-white'>{error && ( langMode == 'BN' ? 'ত্রুটি হচ্ছে...' : 'Error...' )}</div>

            <style dangerouslySetInnerHTML={{ __html: `.tags-item{display: none}.tags-item:nth-child(1){display: inline-flex}` }} />
            <div style={{opacity: 0}}>
                {visiblePostId && ( <style dangerouslySetInnerHTML={{ __html: `.tags-item:nth-child(1){display: none}.tags-item{display: none}#tags-item-${visiblePostId}{display: inline-flex !important}` }} /> )}
            </div>
        </div>
    )
}

export default NewsCard