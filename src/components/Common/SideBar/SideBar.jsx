import React, { useState, useEffect, useContext } from 'react';
import axios from '../../../api/axios';
import { UserContext } from '../../../App';
import { Link } from 'react-router-dom';
import Spinner from '../../Elements/Spinner';
import NewsListQuery from '../../../query/NewsListQuery';

const SideBar = () => {
  const { langMode, userLogin, globalPageNum } = useContext(UserContext);
  const bearer_token = `Bearer ${userLogin.token}`;
  const [loadings, setLoadings] = useState(true);
  const [query, setQuery] = useState('');
  const [type, setType] = useState('');
  const [sideBarAds, setSideBarAds] = useState([]);

  useEffect(() => {
    setQuery('all');
    setType('all');
  }, []);

  const {
    loading, error, news, hasMores, noMore
  } = NewsListQuery(query, globalPageNum, type);

  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  // get ads
  const getAds = async (retryCount = 3, delay = 1000) => {
    try {
      const res = await axios.get('/ads-right-side', config);
      setSideBarAds(res.data);
    } catch (error) {
      if ((retryCount > 0 && error.response?.status === 429) || error.response?.status === 500) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        getAds(retryCount - 1, delay * 2);
      } else {
        console.log(error);
        setLoadings(false);
      }
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    getAds();
  }, []);

  const filteredTags = news.filter((post) => typeof post.tags !== 'undefined');

  return (
    <div className='content-inner sticky top-[12rem]'>
      <h2 className="dark:text-white">{langMode === 'BN' ? 'ট্যাগস' : 'Tags'}</h2>

      <div className='inline-flex flex-wrap gap-4 my-6'>
        {loading && <Spinner />}
        {filteredTags?.map((data, index) => (
          <ul className="tags-item inline-flex flex-wrap gap-4 my-6" key={index} id={`tags-item-${data.id}`}>
            {data.tags?.map((item, index2) => (
              <li key={index2}>
                <Link to={`tags/${item.slug}`} className='bg-gray-100 dark:bg-dark dark:text-white py-4 px-8 rounded-full block transition-all hover:bg-theme hover:text-white text-[1.4rem] leading-normal'>
                  #{langMode === 'BN' ? item.name_bn : item.name_en}
                </Link>
              </li>
            ))}
          </ul>
        ))}

        <div className='text-center dark:text-white'>{noMore && (langMode === 'BN' ? 'আর কোন ট্যাগ নেই' : 'No More tags')}</div>
        <div className='text-center dark:text-white'>{error && (langMode === 'BN' ? 'ত্রুটি হচ্ছে...' : 'Error')}</div>
      </div>

      <hr className="my-4 md:my-12" />
      {loadings && <Spinner />}
      {sideBarAds && (
        <div className="ads">
          <h5 className="font-sans mb-4 dark:text-white">{langMode === 'BN' ? 'স্পন্সর' : 'Sponsored'}</h5>
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
      )}
    </div>
  );
};

export default SideBar;