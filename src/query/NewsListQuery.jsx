import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { debounce } from 'lodash';

export default function NewsListQuery(query, pageNumber, type) {
  const userData = JSON.parse(sessionStorage.getItem('userDetails'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);
  const [hasMores, setHasMores] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const bearer_token = `Bearer ${userData.token}`;
  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const fetchNewsList = async () => {
    try {
      
      let totalPosts, postNum, maxPage;
      switch (type) {
        case 'category':
          totalPosts = await axios.get(`/news-list?category=${query}`, config);
          postNum = await axios.get(`/news-list?paginate=1&category=${query}`, config);
          maxPage = Math.ceil(totalPosts.data.length / 3);  
          break;
        case 'subcategory':
          totalPosts = await axios.get(`/news-list?sub_category=${query}`, config);
          postNum = await axios.get(`/news-list?paginate=1&sub_category=${query}`, config);
          maxPage = Math.ceil(totalPosts.data.length / 3);  
          break;
        case 'tags':
          totalPosts = await axios.get(`/news-list?tag=${query}`, config);
          postNum = await axios.get(`/news-list?paginate=1&tag=${query}`, config);
          maxPage = Math.ceil(totalPosts.data.length / 3);  
          break;
        case 'breaking-news':
          totalPosts = await axios.get('/news-list?breaking=1', config);
          postNum = await axios.get('/news-list?paginate=1&breaking=1', config);
          maxPage = Math.ceil(totalPosts.data.length / 3);  
          break;
        case 'today-news':
          totalPosts = await axios.get('/news-list?todays_news=1', config);
          postNum = await axios.get('/news-list?paginate=1&todays_news=1', config);
          maxPage = Math.ceil(totalPosts.data.length / 3);  
          break;
        default:
          const getPostInfo = await axios.get('/news-feed-info', config)
          maxPage = getPostInfo.data.max_paginate;  
          break;
      }

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

        setHasMores(response.data.length > 0);
        setNoMore(response.data.length == 0);
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

  return { loading, error, news, hasMores, noMore };
}
