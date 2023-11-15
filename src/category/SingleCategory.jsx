import { useParams } from 'react-router-dom';
import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer'
import MainCategory from '../components/Common/MainBody/MainCategory'

const SingleCategory = () => {
    const url_slug  = useParams();

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='home'>
            <Header />
            <MainCategory category={capitalize(url_slug.category)} type={'categories'} />
        </div>
    )
}

export default SingleCategory