import { useState, useEffect, useContext } from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'
import moment from 'moment';
import Spinner from '../Elements/Spinner';
import { UserContext } from '../../App';
import SocialShare from '../Common/Component/SocialShare';


const Search = () => {
    const [ serachData, setSearchData ] = useState('');
    const [ count, setCount ] = useState(0);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const [social, setSocial] = useState(false)
  
    let keyword;
    keyword = JSON.parse(sessionStorage.getItem("userSearch"));
    useEffect(() => {
        setSearchData(keyword);
        fetchData(keyword);
    }, [keyword]);


    const [newsItem, setNewsItem ] = useState([]);
    const [visiblePostId, setVisiblePostId] = useState(null);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [loading, setLoading] = useState(true); 
    const { langMode } = useContext(UserContext);

    const bearer_token = `Bearer ${userData.token}`;
    const config = {
        headers: {
            'Authorization': bearer_token
        }
    };

    const handleSearchChange = (event) => {
        keyword = event.target.value;
        setSearchData(keyword);

        // Clear the previous typing timeout
        clearTimeout(typingTimeout);

        // Set a new timeout to wait before making the API call
        const newTypingTimeout = setTimeout(() => {
        // Make the API call with the search keyword
        fetchData(keyword);
        }, 500); // Adjust the delay time (in milliseconds) according to your preference
        setTypingTimeout(newTypingTimeout);
    };

    const fetchData = async (keyword, retryCount = 3, delay = 1000) => {
        try {
        await axios.get(`/news-list?search=${keyword}`, config)
        .then(res => {
            setNewsItem(res.data);
            setCount( res.data.length );
            //console.log(res.data);
        });
        } catch (error) {
            if (retryCount > 0 && error.response?.status === 429) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                fetchData(retryCount - 1, delay * 2); 
            } else {
                console.log(error);
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    const socialHandle = (e, id) => {
        e.preventDefault();
        setSocial(prevSocial => (prevSocial === id ? null : id));
    }

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

    return (
        <div className='dark:bg-dark'>
            <Header />
            <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
            <div className="container">
                <div className="search-inner text-center">
                    <form action="#" className="max-w-screen-lg mx-auto">
                        <div className="form-group flex items-stretch border rounded-lg dark:border-0">
                            <input type="text" name="s" className="form-control border-0 dark:bg-slate-800 dark:text-white dark:placeholder:text-white" value={serachData} onChange={handleSearchChange} placeholder="Search..." autoComplete="off" />
                            <button type="submit" className="whitespace-nowrap px-6 border-l bg-theme text-white dark:border-transparent">
                                <i className="far fa-search text-3xl"></i>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="news_wrapper w-full max-w-screen-lg mx-auto mt-20 dark:text-white">
                    <hr/>
                    <p className="mb-8 mt-16">{ langMode == 'BN' ? `${serachData}-এর জন্য ${count}-এর মধ্যে 1-${count} ফলাফল দেখানো হচ্ছে` : `Displaying  1-${count} results out of ${count} for "${serachData}"`}</p>

                    <div className="block_news space-y-12">
                        { loading && <Spinner /> }
                        { newsItem && newsItem.map((newsData, index) => (
                            <div className="news_item sm:grid grid-cols-12 gap-12 relative group" key={index}>
                                <div className="news_thumbnail sm:col-span-5 md:col-span-4 rounded-xl overflow-hidden">
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
                                    <a href={newsData.source}>
                                        <img 
                                        src={newsData.thumbnail} 
                                        alt="" 
                                        className="thumbnail w-full object-cover" />
                                    </a>
                                ) }
                                </div>
                                <div className="news_content sm:col-span-7 md:col-span-8 flex flex-col shrink-0 py-6">
                                    { newsData.ads_image ? (
                                    <h3 className="font-semibold leading-[1.7em] group-hover:text-theme">
                                        {newsData.title}
                                    </h3>
                                    ) : (
                                    <h3 className="font-semibold leading-[1.7em] group-hover:text-theme">
                                        { langMode == 'BN' ? newsData.summary_bn : newsData.summary_en}
                                    </h3>         
                                    ) }    
                                    
                                    { newsData.ads_image ? (
                                        <ul className="post_meta flex justify-between border-b pb-2 text-xl mt-8 md:mt-auto">
                                            <li>
                                                { langMode == 'BN' ? 'স্পন্সর:' : 'Sponsored:'} &nbsp; <a href="#" className="font-semibold">{newsData.sponsor}</a>
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="post_meta flex justify-between border-b pb-2 text-xl mt-8 md:mt-auto">
                                            <li>
                                                <ul className="flex gap-6">
                                                    <li>
                                                        <i className="fal fa-clock"></i>
                                                        { moment(new Date(newsData.publish_date)).startOf('hour').fromNow() }
                                                    </li>
                                                    <li>
                                                        <a href={newsData.source} className="transition-all hover:text-theme">
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
                                                            &nbsp;
                                                            <i className="fal fa-bookmark"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="transition-all hover:text-theme" onClick={(e)=> socialHandle(e, newsData.id)}>
                                                            { langMode == 'BN' ? 'শেয়ার' : 'Share'}
                                                            &nbsp;
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
                        ) ) }
                    </div>

                </div>
            </div>
            </div>
            <Footer />
        </div>
    )
}

export default Search 