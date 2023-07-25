import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import { useEffect, useState, useContext } from 'react'
import axios from '../../api/axios'
import { UserContext } from '../../App'
import Spinner from '../Elements/Spinner'

function PrivacyPolicy() {
    const [ loading, setLoading ] = useState(true);
    const [ policyData, setPolicyData ] = useState('');

    const { langMode } = useContext(UserContext);

    const getCategory = async(retryCount = 3, delay = 1000) => {
        try {
            await axios.get('/terms-and-condition-settings', {})
            .then(res => {
                setPolicyData( JSON.parse(res.data[0].value) )
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
        <div className='privecy-policy'>
            <Header />
            <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
            <div className="container">
                <div className="max-w-[90rem] mx-auto">
                    { loading && <Spinner /> }

                    <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-10 md:mb-20 dark:text-white">
                        { langMode == 'BN' ? policyData.tnc_page_title_bn : policyData.tnc_page_title_en }
                    </h2>
                    <div className="space-y-8 border-l border-gray-300 dark:border-gray-500 pl-8 md:pl-12 dark:text-white">
                        <div dangerouslySetInnerHTML={{ __html: langMode == 'BN' ? policyData.tnc_page_content_bn : policyData.tnc_page_content_en }}/>                  
                    </div>
                </div>
            </div>
            </div>        
            <Footer />
        </div>
    )
}

export default PrivacyPolicy