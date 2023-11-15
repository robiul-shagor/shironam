import Header from '../components/Common/Header/Header';
import Footer from '../components/Common/Footer/Footer'
import MainCategory from '../components/Common/MainBody/MainCategory'

const SingleCategorySub = () => {
    return (
        <div className='home'>
            <Header />
            <MainCategory type={'categories'} />
        </div>
    )
}

export default SingleCategorySub