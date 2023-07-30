import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App';

const TabForBreakingPage = () => {
    const { langMode } = useContext(UserContext);
    return (
        <div className="breaking_news_slider py-6 md:py-8 bg-white dark:bg-dark">
            <div className="container">
                <ul className="inline-flex flex-wrap gap-[.6rem] sm:gap-6 pt-5 lg:pt-10">
                    <li>
                        <Link to='/' className='[&.current]:bg-theme [&.current]:border-theme [&.current]:text-white border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-th-large"></i> &nbsp;
                            { langMode == 'BN' ? 'ঘটনাচক্র' : 'News Feed'}
                        </Link>
                    </li>
                    <li>
                        <Link to='/today-news' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-newspaper"></i> &nbsp;
                            { langMode == 'BN' ? 'আজকের খবর' : 'Today News'}
                        </Link>
                    </li>
                    <li>
                        <Link to='/breaking-news' className='current [&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-bullhorn -rotate-[30deg]"></i> &nbsp;
                            { langMode == 'BN' ? 'সাম্প্রতিক খবর' : 'Breakings'}
                        </Link>
                    </li>
                </ul>
                
                <div className="mobile_nav fixed bottom-0 left-0 right-0 z-[1024] overflow-hidden rounded-t-3xl before:content-[''] before:inset-0 before:absolute before:-z-[1] before:bg-[#F2F2F2] dark:before:bg-[#4D4D4D] md:hidden">
                    <ul className="flex items-center text-[1.4rem] justify-between text-[#707070] dark:text-[#B7B7B7]">
                        <li className="flex-1">
                            <Link to='/' className='active flex flex-col justify-center items-center py-8 px-4 gap-2 text-center hover:text-theme dark:hover:text-white [&.active]:text-theme dark:[&.active]:text-white whitespace-nowrap'>
                                <i className="fal fa-th-large"></i> &nbsp;
                                { langMode == 'BN' ? 'ঘটনাচক্র' : 'News Feed'}
                            </Link>
                        </li>
                        <li className="flex-1">
                            <Link to='/today-news' className='flex flex-col justify-center items-center py-8 px-4 gap-2 text-center hover:text-theme dark:hover:text-white [&.active]:text-theme dark:[&.active]:text-white whitespace-nowrap'>
                                <i className="fas fa-bolt"></i>
                                { langMode == 'BN' ? 'আজকের খবর' : 'Today News'}
                            </Link>
                        </li>
                        <li className="flex-1">
                            <Link to='/category' className='flex flex-col justify-center items-center py-8 px-4 gap-2 text-center hover:text-theme dark:hover:text-white [&.active]:text-theme dark:[&.active]:text-white whitespace-nowrap'>
                                <i className="fal fa-compass"></i>
                                { langMode == 'BN' ? 'অন্বেষণ' : 'Explore'}
                            </Link>
                        </li>
                        <li className="flex-1 hidden">
                            <a href="#" className="flex flex-col justify-center items-center py-8 px-4 gap-2 text-center hover:text-theme dark:hover:text-white [&.active]:text-theme dark:[&.active]:text-white whitespace-nowrap">
                                <i className="fal fa-th-large"></i>
                                Deals
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TabForBreakingPage