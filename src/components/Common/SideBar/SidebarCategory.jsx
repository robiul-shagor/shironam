import {React, useState, useEffect, useContext} from 'react'
import axios from '../../../api/axios';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const SidebarCategory = ( { category, types } ) => {
    const [sideBarAds, setSideBarAds] = useState([]);
    const [ tags, setTags ] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const { langMode } = useContext(UserContext);

    const getData = async() => {
        const bearer_token = `Bearer ${userData.token}`;
        try {
            const config = {
                headers: {
                  'Authorization': bearer_token
                }
            };

            await axios.get('/news-list', config)
            .then(res => {
                setTags(res.data);
            });

            await axios.get('/ads-right-side', config)
            .then(res => {
                setSideBarAds(res.data);
            });

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getData();
    }, [])

    let filteredTag;
    if( types == 'tags' ) {
        filteredTag = tags.filter((post) => {
            const tagValues = post.tags ? Object.values(post.tags) : [];
            return tagValues.some((tag) => tag.name_en === category);
        });
    } else {
        filteredTag = tags.filter((post) => post.category_en === category);
    }

    return (
        <div className='content-inner sticky top-[12rem]'>
            <h2 className="dark:text-white">{ langMode == 'BN' ? 'ট্যাগস' : 'Tags'}</h2>

            <div className='inline-flex flex-wrap gap-4 my-6'>
                { filteredTag.length > 0 && filteredTag.map((data, index) => ( 
                        <ul className="tags-item inline-flex flex-wrap gap-4 my-6" key={index} id={`tags-item-${data.id}`}>
                            { data.tags.map( (item, index2) => (
                                <li key={index2}>
                                    <Link to={`/tags/${item.slug}`} className='bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal'>
                                        #{ langMode == 'BN' ? item.name_bn : item.name_en}
                                    </Link>
                                </li>
                            ) ) }
                        </ul>
                    ))
                }
            </div>

            <hr className="my-4 md:my-12" />

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