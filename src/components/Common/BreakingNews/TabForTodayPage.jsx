import {React, useContext} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App'

const TabForTodayPage = () => {
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
                    <Link to='/today-news' className='current [&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                        <i className="fal fa-newspaper"></i> &nbsp;
                        { langMode == 'BN' ? 'আজকের খবর' : 'Today News'}
                    </Link>
                </li>
                <li>
                    <Link to='/breaking-news' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                        <i className="fal fa-bullhorn -rotate-[30deg]"></i> &nbsp;
                        { langMode == 'BN' ? 'সাম্প্রতিক খবর' : 'Breakings'}
                    </Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default TabForTodayPage