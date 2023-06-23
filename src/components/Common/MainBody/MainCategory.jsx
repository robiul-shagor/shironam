import {React, useState, useEffect} from 'react'
import CategoryCard from '../NewsCard/CategoryCard';
import SidebarCategory from '../SideBar/SidebarCategory';
import NewsCard from '../NewsCard/NewsCard';


const MainCategory = ( { category, type } ) => {
    return (
        <div className='main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] max-[767px]:bg-[#EEEEEE] max-[767px]:dark:bg-dark'>

            <div className='relative pt-10 pb-20 md:pt-20 md:pb-0'>
                <div className="red-sticky-bg transition [&amp;.is-sticky]:fixed max-[767px]:hidden -z-[1] absolute top-0 left-0 right-0 bg-theme h-[40rem] lg:h-[55rem] 2xl:h-[65rem]"></div>

                <div className='container'>
                    <div className='md:bg-white dark:bg-dark md:dark:bg-[#272727] md:px-12 md:pt-12 md:pb-20 lg:px-16 lg:pt-16'>
                        <ul className="nav inline-flex gap-20 mb-10">
                            <li className="mr-10">
                                <h2 className="font-bold dark:text-white">
                                    { category }
                                </h2>
                            </li>                        
                        </ul>

                        <div className='post-wrapper md:grid md:grid-cols-3 md:gap-x-12'>
                            <div className='space-y-8 lg:space-y-12 col-span-2'>
                                {<NewsCard /> }
                            </div>

                            <div className='post-sidebar hidden md:block md:col-span-1 md:col-start-3 md:row-start-1'>
                                { <SidebarCategory category={category} types={type} /> }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainCategory