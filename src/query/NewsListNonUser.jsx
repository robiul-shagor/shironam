import { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useParams } from 'react-router-dom';

export default function NewsListNonUser(query) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [news, setNews] = useState([])

    useEffect(() => {
        setNews([])
    }, [query])


    useEffect(() => {
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
        
    }, [query])

    return { loading, error, news }
}