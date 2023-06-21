import {React, useEffect, useState, useContext} from 'react'
import axios from '../../../api/axios'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../App';


const BreakingNews = ({ navigation }) => {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const [newsItem, setNewsItem ] = useState([]);
    const customNavigation = navigation ? navigation : "true";
    const { langMode } = useContext(UserContext);

    useEffect(() => {
        const getData = async() => {
            if( userData == null ) {
                try {    
                    axios.get('/breaking-news-without-authentication', {})
                    .then(res => {
                        setNewsItem(res.data.data);
                    });
    
                } catch (e) {
                    console.log(e);
                }
            } else {
                const bearer_token = `Bearer ${userData.token}`;
                try {
                    const config = {
                        headers: {
                          'Authorization': bearer_token
                        }
                    };
    
                    axios.get('/breaking-news', config)
                    .then(res => {
                        setNewsItem(res.data.data);
                        
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        };
        getData();
    }, [])

  return (
    <div className="breaking_news_slider py-6 md:py-8 bg-white dark:bg-dark">
        <div className="container">

            { newsItem.length > 0 && (
                <div className="slider-title border-b-2 border-theme flex">
                    <span className="bg-theme text-white inline-block px-8 py-3">{ langMode == 'BN' ? 'ব্রেকিং' : 'Breakings'}</span>
                    <marquee 
                        className="flex flex-1 items-center space-x-8" 
                        behavior="scroll" 
                        direction="left" 
                        speed="normal" 
                        scrollamount="4" 
                        onMouseEnter={(e)=>e.target.stop()}  onMouseLeave={(e)=> e.target.start()}>
                        { newsItem.map( (news, index) => (
                            <span className="hover:text-theme dark:text-white font-heading" key={ index }>
                                <i className="fa fa-square text-theme"></i>
                                { langMode == 'BN' ? news.summary_bn : news.summary_en}
                            </span>
                        ) ) }
                    </marquee>
                </div>
            ) }
            { customNavigation == "true" && (

                <ul className="inline-flex flex-wrap gap-[.6rem] sm:gap-6 pt-5 lg:pt-10">
                    <li>
                        <Link to='/' className='current [&.current]:bg-theme [&.current]:border-theme [&.current]:text-white border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                            <i className="fal fa-th-large"></i> &nbsp;
                            { langMode == 'BN' ? 'ঘটনাচক্র' : 'News Feed'}
                            
                        </Link>
                    </li>
                    <li>
                        { userData == null ? (
                            <Link to='/login' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                                <i className="fal fa-newspaper"></i> &nbsp;
                                { langMode == 'BN' ? 'আজকের খবর' : 'Today News'}
                            </Link>            
                        ) : (
                            <Link to='/today-news' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                                <i className="fal fa-newspaper"></i> &nbsp;
                                { langMode == 'BN' ? 'আজকের খবর' : 'Today News'}
                            </Link>
                        ) }
                    </li>
                    <li>
                        { userData == null ? (
                            <Link to='/login' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                                <i className="fal fa-bullhorn -rotate-[30deg]"></i> &nbsp;
                                { langMode == 'BN' ? 'সাম্প্রতিক খবর' : 'Breakings'}
                                
                            </Link>          
                        ) : (
                            <Link to='/breaking-news' className='[&.current]:bg-theme [&.current]:border-theme border m-0 py-4 px-8 cursor-pointer max-[480px]:text-[1.3rem] max-[480px]:px-[1.2rem] hover:bg-theme hover:text-white dark:text-white hover:border-theme transition-all block'>
                                <i className="fal fa-bullhorn -rotate-[30deg]"></i> &nbsp;
                                { langMode == 'BN' ? 'সাম্প্রতিক খবর' : 'Breakings'}
                            </Link>
                        ) }
                    </li>
                </ul>
            ) }
        </div>
    </div>
  )
}

export default BreakingNews