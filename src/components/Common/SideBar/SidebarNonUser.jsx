import {React, useState, useEffect} from 'react'
import axios from '../../../api/axios';

const SidebarNonUser = () => {
    const [sideBarAds, setSideBarAds] = useState([]);
    const [ tags, setTags ] = useState([]);

    useEffect(() => {
        const getData = async() => {
            try {
                axios.get('/news-list-without-authentication', {})
                .then(res => {
                    setTags(res.data.data);
                });
            } catch (e) {
                console.log(e);
            }
        };

        getData();
    }, [])


  return (
    <div className='content-inner sticky top-[12rem]'>
        <h2 className="dark:text-white">Tags</h2>

        <div className='inline-flex flex-wrap gap-4 my-6'>
            { tags.map((data, index) => ( 
                    <ul className="tags-item inline-flex flex-wrap gap-4 my-6" key={index} id={`tags-item-${data.id}`}>
                        { data.tags.map( (item, index2) => (
                            <li key={index2}>
                                <a href='#' className="bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal">#{item.name_en}</a>
                            </li>
                        ) ) }
                    </ul>
                ))
            }
        </div>
    </div>
  )
}

export default SidebarNonUser