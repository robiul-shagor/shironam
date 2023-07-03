import { useEffect, useState } from 'react'
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function NewsListQuery(query, pageNumber, type) {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [news, setNews] = useState([])
    const [hasMores, setHasMores] = useState(false)

    const url_slug  = useParams();
    const history = useNavigate();

    const { mainCategory, subCategory } = useParams();

    const bearer_token = `Bearer ${userData.token}`;
    const config = {
        headers: {
          'Authorization': bearer_token
        }
    }

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    useEffect(() => {
        setNews([])
    }, [query, type])

    useEffect(() => {
        setLoading(true)
        setError(false)

        if( typeof url_slug.category !== 'undefined' ) {
            try { 
                axios.get(`/news-list`, config)
                .then(res => {
                    const category = url_slug.category;
                    const subCategory = url_slug.category;
                    setNews( (prevItems) => {
                        const existingIds = new Set(prevItems.map((item) => item.id));
                         // Filter out duplicate items based on their IDs
                        const uniqueItems = res.data.filter((item) => !existingIds.has(item.id));

                        const filteredPosts = uniqueItems.filter((post) => post.category_en === capitalize(category));

                        const filteredSubPosts = uniqueItems.filter((post) => post.sub_category_en === capitalize(subCategory));

                        // Combine the unique items with the existing items
                        return [...prevItems, ...filteredPosts];
                    } )

                    //setHasMores(res.data.length > 0)
                    setHasMores(false)
                    setLoading(false)
                })
            } catch(e) {
                //if (axios.isCancel(e)) return
                setError(true)
            }
        } else if( type == 'subcategory' ) {
            
            try { 
                axios.get(`/news-list?sub_category=${subCategory}`, config)
                .then(res => {
                    setNews( (prevItems) => {
                        const existingIds = new Set(prevItems.map((item) => item.id));
                         // Filter out duplicate items based on their IDs
                        const uniqueItems = res.data.filter((item) => !existingIds.has(item.id));

                        

                        // const filteredSubPosts = uniqueItems.filter((post) => post.sub_category_en === capitalize(subCategory));

                        return [...prevItems, ...uniqueItems];
                    } )

                    //setHasMores(res.data.length > 0)
                    setHasMores(false)
                    setLoading(false)
                })
            } catch(e) {
                //if (axios.isCancel(e)) return
                setError(true)
            }
        } else if( typeof url_slug.tags !=='undefined' ) {
            try { 
                axios.get(`/news-list`, config)
                .then(res => {
                    setNews( (prevItems) => {
                        const existingIds = new Set(prevItems.map((item) => item.id));

                        // Filter out duplicate items based on their IDs
                        const uniqueItems = res.data.filter((item) => !existingIds.has(item.id));

                        const filteredPosts = uniqueItems.filter((post) => {
                            const tagValues = post.tags ? Object.values(post.tags) : [];
                            return tagValues.some((tag) => tag.slug === url_slug.tags);
                        });

                        // Combine the unique items with the existing items
                        return [...prevItems, ...filteredPosts];
                    } )

                    //setHasMores(res.data.length > 0)
                    setHasMores(false)
                    setLoading(false)
                })
            } catch(e) {
                //if (axios.isCancel(e)) return
                setError(true)
            }
        } else {
            try { 
                axios.get(`/news-list?paginate=${pageNumber}`, config)
                .then(res => {
                    setNews((prevItems) => {
                        // Create a Set of existing item IDs
                        const existingIds = new Set(prevItems.map((item) => item.id));
                    
                        // Filter out duplicate items based on their IDs
                        const uniqueItems = res.data.filter((item) => !existingIds.has(item.id));
                    
                        // Combine the unique items with the existing items
                        return [...prevItems, ...uniqueItems];
                    });
                    
                    setHasMores(res.data.length > 0)
                    setLoading(false)
                })
            } catch(e) {
                //if (axios.isCancel(e)) return
                setError(true)
            }
        }
        
    }, [query, pageNumber])

    return { loading, error, news, hasMores }
}