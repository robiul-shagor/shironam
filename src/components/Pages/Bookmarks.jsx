import React, { useEffect, useState, useContext } from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'
import moment from 'moment'
import { UserContext } from '../../App';

const Bookmarks = () => {
  const userData = JSON.parse(sessionStorage.getItem("userDetails"));
  const bearer_token = `Bearer ${userData.token}`;
  const [bookmark, setBookmark] = useState([]);
  const [regenerateData, setRegenerateData] = useState(false);

  const { langMode } = useContext(UserContext);

  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const removeBookmarkHandle = async(event) => {
    event.preventDefault();
    const bookmarkId = event.currentTarget.getAttribute('data-bookmark');
    try {           
      await axios.post('/bookmark-remove', {news_id: bookmarkId}, {headers: {
        'Authorization': bearer_token
      }})
      .then(res => {
        if( res.data.status == "Success" ) {
          setRegenerateData(true);
        }
      });
    } catch (e) {
        console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      axios.get('/bookmark-list', config)
      .then(res => {
        setBookmark(res.data.data);
        //console.log(res.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    if (regenerateData) {
      fetchData();
      setRegenerateData(false); // Reset the flag after data regeneration
    }
  }, [regenerateData]);
  
  return (
    <div className='booksmarks-pages'>
      <Header />

      <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
        <div className="container">
            <div className="md:max-w-[70rem] lg:max-w-[80rem] 2xl:max-w-[90rem] mx-auto">
                <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-10 md:mb-20 dark:text-white">
                  { langMode == 'BN' ? 'আমার বুকমার্ক' : 'My Bookmarks'}
                </h2>
    
                <ul className="bookmark-list space-y-12">
                    { bookmark.length > 0 && bookmark.map( (item, index) => (
                      <li className="flex items-center gap-6 sm:gap-10" key={index}>
                          <div className="thumb shrink-0">
                              <a href="#">
                                  <img src={item.thumbnail} className="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="Bookmark News" />
                              </a>
                          </div>
                          <div className="news_info max-w-[50rem] dark:text-white">
                              <h3 className="font-sans text-[1.4rem] sm:text-[1.6rem] leading-[1.7em] line-clamp-2">
                                  <a href="#" className="hover:opacity-80">
                                    { langMode == 'BN' ? item.summary_bn : item.summary_en}
                                  </a>
                              </h3>
                              <ul className="post_meta flex justify-between pb-2 text-xl mt-4 md:mt-8">
                                  <li className="opacity-50">
                                      <i className="far fa-clock"></i>
                                      { moment(new Date(item.date)).startOf('hour').fromNow() }
                                  </li>
                                  <li>
                                      <a href={item.source} className="text-blue hover:underline">
                                        { langMode == 'BN' ? 'উৎস দেখুন' : 'View Source'}
                                        
                                      </a>
                                  </li>
                              </ul>
                          </div>
                          <div className="ml-auto dark:text-white flex max-md:flex-col max-md:space-y-4 md:space-x-4 lg:space-x-8">
                              <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Share">
                                  <i className="fal fa-share"></i>
                              </a>
                              <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Remove" data-bookmark={item.news_id} onClick={removeBookmarkHandle}>
                                  <i className="fal fa-trash-alt"></i>
                              </a>
                          </div>
                      </li>
                    ) ) }
                </ul>
            </div>
        </div>
      </div>      
    <Footer />
    </div>
  )
}

export default Bookmarks