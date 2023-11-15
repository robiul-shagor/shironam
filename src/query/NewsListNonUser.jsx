import { useEffect, useState, useContext } from 'react'
import axios from '../api/axios';
import { UserContext } from '../App';

export default function NewsListNonUser(query) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [news, setNews] = useState([])
    const { reloadFeed, setReloadFeed } = useContext(UserContext);

    useEffect(() => {
        setNews([])
    }, [query])

    const fetchData = () => {
        setLoading(true)
        setError(false)
        try {
            axios.get('/news-list-without-authentication', {})
            .then(res => {
                setNews(res.data.data)
                setLoading(false)
            });
        } catch (e) {
            setError(true)
        }
    }

    useEffect(() => {
        fetchData();
    }, [query])  
    
    useEffect(() => {
        if( reloadFeed ) {
            setLoading(true);
            fetchData();
            setReloadFeed(false);
        }
    }, [query, reloadFeed])

    return { loading, error, news }
}