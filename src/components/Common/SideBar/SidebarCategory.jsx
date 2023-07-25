import { useState, useEffect, useContext} from 'react'
import axios from '../../../api/axios';
import { Link, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../../App';
import NewsListQuery from '../../../query/NewsListQuery';
import Spinner from '../../Elements/Spinner';

const SidebarCategory = () => {
    const [sideBarAds, setSideBarAds] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const { langMode } = useContext(UserContext);

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const { category, subCategory, tags } = useParams()
    const [type, setType] = useState('')
    const location = useLocation();
    const [loadings, setLoadings] = useState(true); 

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
        } else {
            setType('all');
        }
    }, [location, category, subCategory, tags]); 


    const {
        loading, error, news, hasMores, noMore
    } = NewsListQuery(query, pageNumber, type)

    const getData = async(retryCount = 3, delay = 1000) => {
        const bearer_token = `Bearer ${userData.token}`;
        try {
            const config = {
                headers: {
                  'Authorization': bearer_token
                }
            };

            await axios.get('/ads-right-side', config)
            .then(res => {
                setSideBarAds(res.data);
            });
        } catch (error) {
            if (retryCount > 0 && error.response?.status === 429) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                getData(retryCount - 1, delay * 2); 
            } else {
                console.log(error);
                setLoadings(false);
            }
        } finally {
            setLoadings(false); 
        }
    };

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='content-inner sticky top-[12rem]'>
            <h2 className="dark:text-white">{ langMode == 'BN' ? 'ট্যাগস' : 'Tags'}</h2>

            <div className='inline-flex flex-wrap gap-4 my-6'>
                { news && news.map((data, index) => ( 
                        <ul className="tags-item inline-flex flex-wrap gap-4 my-6" key={index} id={`tags-item-${data.id}`}>
                            { data.tags && data.tags.map( (item, index2) => (
                                <li key={index2}>
                                    <Link to={`/tags/${item.slug}`} className='bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal'>
                                        #{ langMode == 'BN' ? item.name_bn : item.name_en}
                                    </Link>
                                </li>
                            ) ) }
                        </ul>
                    ))
                }

                <div>{loading && <Spinner />}</div>
                <div className='text-center'>{noMore && ( langMode == 'BN' ? 'আর এন্ট্রি নেই' : 'No More' )}</div>
                <div>{error && ( langMode == 'BN' ? 'Error' : 'ত্রুটি হচ্ছে...' )}</div>
            </div>


            <hr className="my-4 md:my-12" />

            { loadings && <Spinner />}
            { sideBarAds && (
                <div className="ads">
                    <h5 className="font-sans mb-4 dark:text-white">{ langMode == 'BN' ? 'স্পন্সর' : 'Sponsored'}</h5>
                    <ul>
                        <li>
                            <a href={sideBarAds.action_url} className="flex items-start gap-6" data-id={sideBarAds.id}>
                                <img src={sideBarAds.sponsor_image} className="md:w-2/5" alt="" />
                                <div className="flex-1 dark:text-white">
                                    <h3 className="font-sans md:text-xl">
                                        {sideBarAds.title}
                                    </h3>
                                    <p className="text-sm mt-3">{sideBarAds.sponsor}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            ) }
        </div>
    )
}

export default SidebarCategory