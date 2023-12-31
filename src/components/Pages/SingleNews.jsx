import { useState, useEffect, useContext} from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'
import { UserContext } from '../../App'
import { useParams, Link } from 'react-router-dom'
import Spinner from '../Elements/Spinner'
import { Helmet } from 'react-helmet'


function SingleNews() {
    const { langMode } = useContext(UserContext);
    const { id } = useParams();
    const [news, setNews] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const currentUrl = window.location.href;

    const singleData = async(retryCount = 3, delay = 1000)=> {
        setLoading(true);
        try { 
            axios.get(`/news/${id}`, {})
            .then(res => {
                setNews(res.data.data)
            })
        } catch(e) {
            if (retryCount > 0 && error.response?.status === 429) {
                setLoading(true);
                await new Promise((resolve) => setTimeout(resolve, delay));
                singleData(retryCount - 1, delay * 2); 
            } else {
                console.log(error);
                setLoading(false);
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(()=> {
        singleData();
    }, [])

    return (
        <div className='single-news'>
            <Helmet>
                <title>{ langMode == 'BN' ? news.summary_bn : news.summary_en}</title>
                <meta property="og:url" content={currentUrl} />
                <meta property="og:title" content={ langMode == 'BN' ? news.summary_bn : news.summary_en} />
                <meta property="og:description" content="" />
                <meta property="og:image" content={news.thumbnail}  />

                <meta name="twitter:card" content="" />
                <meta name="twitter:title" content={ langMode == 'BN' ? news.summary_bn : news.summary_en} />
                <meta name="twitter:description" content="" />
                <meta name="twitter:image" content={news.thumbnail} />

                <meta property="og:image:secure_url" content={news.thumbnail}  />
            </Helmet>
            <Header />

            <div className='main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] max-[767px]:bg-[#EEEEEE] max-[767px]:dark:bg-dark'>
                <div className='relative pt-10 pb-20 md:pt-20 md:pb-0'>
                    <div className="red-sticky-bg transition [&amp;.is-sticky]:fixed max-[767px]:hidden -z-[1] absolute top-0 left-0 right-0 bg-theme h-[40rem] lg:h-[55rem] 2xl:h-[65rem]"></div>
                    <div className='container'>
                        <div className='md:bg-white dark:bg-dark md:dark:bg-[#272727] md:px-12 md:pt-12 md:pb-20 lg:px-16 lg:pt-16'>
                            { loading && <Spinner /> }
                            <div className='post-wrapper md:grid md:grid-cols-3 md:gap-x-12'>
                                <div className='space-y-8 lg:space-y-12 col-span-2'>
                                    <div className="post-item group max-[767px]:p-6 bg-white dark:bg-transparent max-[767px]:dark:bg-[#1E1E1E]">
                                        <div className='post-body'>
                                            <img 
                                            src={news.thumbnail} 
                                            alt="" 
                                            className="thumbnail w-full object-cover" />

                                            <h1 className="post-title font-semibold text-2xl md:text-3xl mt-6 !leading-[1.7em] transition-all hover:text-theme line-clamp-3 dark:text-white">
                                                { langMode == 'BN' ? news.summary_bn : news.summary_en}
                                            </h1> 
                                        </div>
                                    </div>
                                </div>

                                <div className='post-sidebar hidden md:block md:col-span-1 md:col-start-3 md:row-start-1'>
                                    <div className='content-inner sticky top-[12rem]'>
                                        <h2 className="dark:text-white">{ langMode == 'BN' ? 'ট্যাগস' : 'Tags'}</h2>

                                        <div className='inline-flex flex-wrap gap-4 my-6'>
                                            <ul className="tags-item inline-flex flex-wrap gap-4 my-6">
                                                { typeof news.tags !== 'undefined' && news.tags.map( (item, index) => (
                                                    <li key={index}>
                                                        <Link to={`tags/${item.slug}`} className='bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal'>
                                                            #{ langMode == 'BN' ? item.name_bn : item.name_en}
                                                        </Link>
                                                    </li>
                                                ) ) }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default SingleNews