import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import { useState, useEffect, useContext } from 'react'
import axios from '../../api/axios'
import Spinner from '../Elements/Spinner'
import { UserContext } from '../../App'

const AboutUs = () => {
    const [ about, setAbout ] = useState('');
    const [ loading, setLoading ] = useState(true);
    const { langMode } = useContext( UserContext );
    const { siteSetting, baseURL } = useContext( UserContext );
  
    const getCategory = async(retryCount = 3, delay = 1000) => {
        try {
            await axios.get('/about-settings', {})
            .then(res => {
                setAbout( JSON.parse(res.data[0].value) )
            });
        } catch (error) {
            if (retryCount > 0 && error.response?.status === 429) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                getCategory(retryCount - 1, delay * 2); 
            } if (retryCount > 0 && error.response?.status === 500) {
                await new Promise((resolve) => setTimeout(resolve, delay));
                getCategory(retryCount - 1, delay * 2); 
            } else {
                console.log(error);
                setLoading(false);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=> {
        getCategory();
    }, [])

    return (
        <div className='about-us-wrapper'>
            <Header />
            <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-32">
                { loading && <Spinner /> }
                <div className="container">
                    <h2 className="font-bold mb-12 text-[2.8rem] dark:text-white">{ langMode == 'BN' ? about.about_page_title_bn : about.about_page_title_en}</h2>

                    <div className="space-y-16 border-l-2 border-gray-400 pl-8 sm:pl-12">
                        <div dangerouslySetInnerHTML={{ __html: langMode == 'BN' ? about.about_page_content_bn : about.about_page_content_en }}/>
                    </div>

                    <div className="mt-16 md:mt-28 md:grid md:grid-cols-12 gap-x-12 max-[767px]:space-y-8">

                        <div className="image col-span-6 md:col-span-4 xl:col-span-5">
                            <img src={ `${baseURL}${about.about_thumbnail}` } alt="Our Values And Mission" />
                        </div>

                        <div className="col-span-6 md:col-span-8 xl:col-start-6">

                            <h3 className="font-semibold text-[2.4rem] mb-8 dark:text-white">Our Values And Mission</h3>
                            <div className="space-y-12 border-l-2 border-gray-400 pl-8 md:pl-12">
                                <p>
                                    Integer eget aliquet nibh praesent tristique. Tempus quam pellentesque nec nam aliquam sem. Ut sem viverra aliquet eget sit amet tellus cras. Neque laoreet suspendisse interdum consectetur. Viverra nam libero justo laoreet sit amet cursus sit. Urna duis convallis convallis tellus id interdum velit. Sed pulvinar proin gravida hendrerit lectus a. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. 
                                </p>
                                <p>
                                    Adipiscing diam donec adipiscing tristique risus nec feugiat. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Vestibulum sed arcu non odio euismod lacinia at quis. Quam pellentesque nec nam aliquam. Tempus egestas sed sed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AboutUs