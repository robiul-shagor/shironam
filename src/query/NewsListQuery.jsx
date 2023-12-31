import { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { debounce } from 'lodash';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';


export default function NewsListQuery(query, pageNumber, type) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMores, setHasMores] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [noPosts, setNoPosts] = useState('');
  const { setGlobalPageNum, langMode } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();

  const bearer_token = `Bearer ${userData.token}`;
  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const fetchNewsList = async () => {
    try {
      let totalPosts, maxPage;
      switch (type) {
        case 'category':
          totalPosts = await axios.get(`/news-feed-info?category=${query}`, config)
          maxPage = totalPosts.data.max_paginate;
          break;
        case 'subcategory':
          totalPosts = await axios.get(`/news-feed-info?sub_category=${query}`, config)
          break;
        case 'tags':
          totalPosts = await axios.get(`/news-feed-info?tag=${query}`, config)
          break;
        case 'breaking-news':
          totalPosts = await axios.get('/news-feed-info?breaking=1', config);
          break;
        case 'today-news':
          totalPosts = await axios.get('/news-feed-info?todays_news=1', config);
          break;
        default:
          totalPosts = await axios.get('/news-feed-info', config);
          break;
      }

      maxPage = totalPosts.data.max_paginate; 

      if (pageNumber <= maxPage) {
        let response;
        switch (type) {
          case 'category':
            response = await axios.get(`/news-list?paginate=${pageNumber}&category=${query}`, config);
            break;
          case 'subcategory':
            response = await axios.get(`/news-list?paginate=${pageNumber}&sub_category=${query}`, config);
            break;
          case 'tags':
            response = await axios.get(`/news-list?paginate=${pageNumber}&tag=${query}`, config);
            break;
          case 'breaking-news':
            response = await axios.get(`/news-list?paginate=${pageNumber}&breaking=1`, config);
            break;
          case 'today-news':
            response = await axios.get(`/news-list?paginate=${pageNumber}&todays_news=1`, config);
            break;
          default:
            response = await axios.get(`/news-list?paginate=${pageNumber}`, config);
            break;
        }

        setNews(prevItems => {
          const existingIds = new Set(prevItems.map(item => item.id));
          const uniqueItems = response.data.filter(item => !existingIds.has(item.id));
          const updatedNews = [...prevItems, ...uniqueItems];
          return updatedNews;
        });

        setGlobalPageNum(pageNumber);
        setHasMores(response.data.length > 0);
        setNoMore(response.data.length == 0);
        setNoPosts(response.data.length == 0 && langMode == 'BN' ?  'আর কোন পোস্ট নেই' : 'No More Posts' );
        setLoading(false);
      } else {
        setHasMores(false); // No more pages available
        setLoading(false);
        setNoMore(true);
      }
    } catch (e) {
      if (e.response && e.response.status === 429) {
        // Handle 429 error (Too Many Requests)
        setLoading(true);
        //setError(true);
        // Retry fetching after some time (e.g., 5 seconds)
        setTimeout(() => {
          setLoading(true);
          setError(false);
          debouncedFetchNewsList(query, pageNumber, type);
        }, 5000);
      } else if (e.response && e.response.status === 500) {
        setLoading(true);
        setTimeout(() => {
          setLoading(true);
          setError(false);
          debouncedFetchNewsList(query, pageNumber, type);
        }, 5000);
      } else if(e.response?.data?.message === 'Unauthenticated.' ) {
        localStorage.removeItem("userDetails");
        localStorage.setItem("hasReloaded", "true");
        
        const hasReloaded = localStorage.getItem("hasReloaded");
        if (!hasReloaded) {
          navigate('/');
          window.location.reload();
        }
      } else {
        setError(true);
        setLoading(false);
      }
    }
  };

  // Create the debounced version of fetchNewsList using debounce from lodash
  const debouncedFetchNewsList = debounce(fetchNewsList, 200);

  useEffect(() => {
    setNews([])
  }, [query, type])

  useEffect(() => {
    setLoading(true);
    setError(false);

    // Call the debounced version of fetchNewsList instead of the original one
    debouncedFetchNewsList();

    return () => {
      // Cleanup the debounce function when the component unmounts
      debouncedFetchNewsList.cancel();
    };
  }, [query, pageNumber, type]);

  return { loading, error, news, hasMores, noMore, noPosts };
}
