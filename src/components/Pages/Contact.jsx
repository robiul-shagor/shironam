import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import Spinner from '../Elements/Spinner'
import axios from '../../api/axios'


const Contact = () => {
    const [ loading, setLoading ] = useState(true);
    const { langMode } = useContext( UserContext );
    const [ contact, setContact ] = useState(true);
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
  
    const getCategory = async(retryCount = 3, delay = 1000) => {
        try {
            await axios.get('/contact-settings', {})
            .then(res => {
                setContact( JSON.parse(res.data[0].value) )
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

    const contactHanddler = async(event) => {
        event.preventDefault(); 

        setLoading(true);

        try {
            await axios.post('/contact-submit', {full_name: name, email, phone, message}, {headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*',
            }})
            .then(res => {
                if( res.data.status == "Success" ) {
                    setSuccess( res.data.message )
                }
            });
        } catch (error) {
            setError(e.response.data.errors)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='contact-wrapper'>
            <Header />
            <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-8 pb-32">
                { loading && <Spinner /> }
                <div className="container">
                    <div className="md:grid grid-cols-12 gap-8 max-[768px]:space-y-16 pt-32">
                        <div className="contact-form col-span-6 lg:col-span-5 dark:text-white">
                            <h1 className="font-bold mb-12">{ langMode == 'BN' ? contact.contact_page_title_bn : contact.contact_page_title_en }</h1>

                            <form action="#" className="space-y-8" onSubmit={contactHanddler}>
                                <div className="form-group">
                                    <label>{ langMode == 'BN' ? 'নাম' : 'Name' } <span className="text-red-600">*</span></label>
                                    <input type="text" className="form-control dark:bg-slate-800" required value={name} onChange={(e) => setName(e.target.value) } />
                                    {typeof error.full_name !== 'undefined' && <span className="error">{error.full_name}</span>}
                                </div>
                                <div className="form-group">
                                    <label>{ langMode == 'BN' ? 'ইমেইল' : 'Email' }<span className="text-red-600">*</span></label>
                                    <input type="email" className="form-control dark:bg-slate-800" required value={email} onChange={(e)=> setEmail(e.target.value)} />
                                    {typeof error.email !== 'undefined' && <span className="error">{error.email}</span>}
                                </div>
                                <div className="form-group">
                                    <label>{ langMode == 'BN' ? 'ফোন নম্বর' : 'Phone Number' }</label>
                                    <input type="text" className="form-control dark:bg-slate-800" value={phone} onChange={(e)=> setPhone( e.target.value )} />
                                    {typeof error.phone !== 'undefined' && <span className="error">{error.phone}</span>}
                                </div>
                                <div className="form-group">
                                    <label>{ langMode == 'BN' ? 'বার্তা' : 'Message' }<span className="text-red-600">*</span></label>
                                    <textarea rows="10" className="w-full dark:bg-slate-800" required value={message} onChange={(e)=> setMessage( e.target.value )} />
                                    {typeof error.message !== 'undefined' && <span className="error">{error.message}</span>}
                                </div>

                                <div>
                                    <button type='submit' className="btn-dark-full dark:bg-[#272727]">
                                        { loading ? <Spinner /> : (langMode == 'BN' ? 'বার্তা পাঠান' : 'Send Message' ) }
                                    </button>
                                </div>

                                { success && (
                                <div className="flex items-center bg-theme_blue text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                                    <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                                    <p className='text-white'>{success}</p>
                                </div>
                                ) }

                            </form>
                        </div>
                        <div className="col-span-6 lg:col-start-7">
                            <div className="loacation-map md:h-full">
                                <div dangerouslySetInnerHTML={{ __html: contact.map_iframe }}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact