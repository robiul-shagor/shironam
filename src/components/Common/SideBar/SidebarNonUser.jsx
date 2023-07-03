import {React, useState, useEffect, useContext} from 'react'
import axios from '../../../api/axios';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import NewsListNonUser from '../../../query/NewsListNonUser';

const SidebarNonUser = () => {
    const { langMode } = useContext(UserContext);
    const [ query, setQuery ] = useState([]);
    const { loading, error, news } = NewsListNonUser(query)

    const filteredTags = news.filter((post) => typeof post.tags !== 'undefined' );

    return (
        <div className='content-inner sticky top-[12rem]'>
            <h2 className="dark:text-white">{ langMode == 'BN' ? 'ট্যাগস' : 'Tags'}</h2>

            <div className='inline-flex flex-wrap gap-4 my-6'>
                { filteredTags.length > 0 && filteredTags.map((data, index) => ( 
                        <ul className="tags-item inline-flex flex-wrap gap-4 my-6" key={index} id={`tags-item-${data.id}`}>
                            { data.tags.map( (item, index2) => (
                                <li key={index2}>
                                    <Link to='/login' className='bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal'>
                                        #{ langMode == 'BN' ? item.name_bn : item.name_en}
                                    </Link>
                                </li>
                            ) ) }
                        </ul>
                    ))
                }

                <div>{loading && ( langMode == 'BN' ? 'লোড হচ্ছে...' : 'Loading...')}</div>
                <div>{error && ( langMode == 'BN' ? 'Error' : 'ত্রুটি হচ্ছে...' )}</div>
            </div>
        </div>
    )
}

export default SidebarNonUser