import {React, useState, useEffect, useContext} from 'react'
import axios from '../../../api/axios';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import Spinner from '../../Elements/Spinner';

const SideBar = () => {
    const [sideBarAds, setSideBarAds] = useState([]);
    const [ tags, setTags ] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const { langMode } = useContext(UserContext);
    const bearer_token = `Bearer ${userData.token}`;
    const [loading, setLoading] = useState(true); 

    const config = {
        headers: {
          'Authorization': bearer_token
        }
    };
    
    // Get Tags data
    const getData = async(retryCount = 3, delay = 1000) => {
        try {
            await axios.get('/news-list', config)
            .then(res => {
                setTags(res.data);
            });      
        } catch (error) {
            if (retryCount > 0 && error.response?.status === 429) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                getData(retryCount - 1, delay * 2); 
            } else {
                console.log(error);
                setLoading(false);
            }
        } finally {
            setLoading(false); 
        }
    };    
    
    // get ads
    const getAds = async(retryCount = 3, delay = 1000) => {
        try {     
            await axios.get('/ads-right-side', config)
            .then(res => {
                setSideBarAds(res.data);
            });
        } catch (error) {
            if (retryCount > 0 && error.response?.status === 429) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                getAds(retryCount - 1, delay * 2); 
            } else {
                console.log(error);
                setLoading(false);
            }
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getData();
    }, [])    
    
    useEffect(() => {
        getAds();
    }, [])

    const filteredTags = tags.filter((post) => typeof post.tags !== 'undefined' );

    return (
        <div className='content-inner sticky top-[12rem]'>
            <h2 className="dark:text-white">{ langMode == 'BN' ? 'ট্যাগস' : 'Tags'}</h2>

            <div className='inline-flex flex-wrap gap-4 my-6'>
                { loading && <Spinner />}
                { filteredTags?.map((data, index) => ( 
                    <ul className="tags-item inline-flex flex-wrap gap-4 my-6" key={index} id={`tags-item-${data.id}`}>
                        { data.tags?.map( (item, index2) => (
                            <li key={index2}>
                                <Link to={`tags/${item.slug}`} className='bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal'>
                                    #{ langMode == 'BN' ? item.name_bn : item.name_en}
                                </Link>
                            </li>
                        ) ) }
                    </ul>
                )) }
            </div>

            <hr className="my-4 md:my-12" />
            { loading && <Spinner />}
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

export default SideBar