import {React, useState, useEffect} from 'react'
import axios from '../../../api/axios';

const SidebarCategory = ( { category } ) => {
    const [sideBarAds, setSideBarAds] = useState([]);
    const [ tags, setTags ] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    useEffect(() => {
        const getData = async() => {
            const bearer_token = `Bearer ${userData.token}`;
            try {
                const config = {
                    headers: {
                      'Authorization': bearer_token
                    }
                };

                axios.get('/news-list', config)
                .then(res => {
                    setTags(res.data);
                });

                axios.get('/ads-right-side', config)
                .then(res => {
                    setSideBarAds(res.data);
                });

            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [])

    const filteredTag = tags.filter((post) => post.category_en === category);

  return (
    <div className='content-inner sticky top-[12rem]'>
        <h2 className="dark:text-white">Tags</h2>

        <div className='inline-flex flex-wrap gap-4 my-6'>
            { filteredTag.map((data, index) => ( 
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

        <hr className="my-4 md:my-12" />

        { sideBarAds && (
            <div className="ads">
                <h5 className="font-sans mb-4 dark:text-white">Sponsored</h5>
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