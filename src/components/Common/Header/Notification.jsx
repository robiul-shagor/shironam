import {useState, useCallback, useContext, useRef, useEffect} from 'react'
import useIntervalAsync from './useIntervalAsync';
import axios from '../../../api/axios';
import { UserContext } from '../../../App';
import moment from 'moment';
//import 'moment/locale/bn-bd';

import { Link } from 'react-router-dom';

const Notification = () => {
    const [notificationBtn, setNotificationBtn] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const notificationButtonRef = useRef(null);
    
    const { langMode } = useContext(UserContext);
    const userData = JSON.parse(localStorage.getItem("userDetails"));
    const handleNotificationBtn = event => {
        event.preventDefault();
        setNotificationBtn(!notificationBtn);
    };
    
    const bearer_token = `Bearer ${userData.token}`;
    //moment.locale('bn-bd');

    const config = {
        headers: {
            'Authorization': bearer_token
        }
    };
    useEffect(() => {
        const handleDocumentClick = (e) => {
          const isSocialDropdown = e.target.closest('.dropdown-notification');
          const isSocialTrigger = e.target.closest('#dropdown_notification');
      
          if (!isSocialDropdown && !isSocialTrigger) {
            setNotificationBtn(false);
          }
        };
      
        document.body.addEventListener('click', handleDocumentClick);
      
        return () => {
          document.body.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const updateState = useCallback(async () => {
        try {
            await axios.get('/notifications', config)
            .then(res => {
                setNotificationData(res.data);
            });
        } catch (e) {
            if(e.response?.data?.message === 'Unauthenticated.' ) {
                const hasReloaded = localStorage.getItem("hasReloaded");
                if (!hasReloaded) {
                    localStorage.removeItem("userDetails");
                    localStorage.setItem("hasReloaded", "true");
                    // Reload the window only if it hasn't been reloaded before
                    window.location.reload();
                }
            } else {
                console.log(e);
            }
        }
    }, []);

    const update = useIntervalAsync(updateState, 300000);

    const readNotification = async(event) => {
        event.preventDefault();
        const currentItem = event.currentTarget;
        const notificationkId = currentItem.getAttribute('data-notification');
        try {
            await axios.post('/read-notification', {id: notificationkId}, {headers: {
                'Authorization': bearer_token
            }})
            .then(res => {
                console.log(res);
            });
        } catch (e) {
            console.log(e);
        }
    };    
    
    const readAllNotification = async(event) => {
        event.preventDefault();
        try {
            await axios.post('/mark-all-read-notifications', {}, {headers: {
                'Authorization': bearer_token
            }})
            .then(res => {
                console.log(res);
            });
        } catch (e) {
            console.log(e);
        }
    };

  const filteredPosts = notificationData.filter((post) => post.read_at === null);

  return (
    <li className="relative" >
        <a href="#" 
            className="text-[1.8rem] relative dark:text-white"  
            id="dropdown_notification" 
            aria-expanded="false" 
            data-te-dropdown-toggle-ref 
            data-te-auto-close="outside" onClick={handleNotificationBtn} ref={notificationButtonRef}>
            <i className="fas fa-bell"></i>
            <span className="bg-red-500 absolute text-white -top-3 -right-3 w-6 h-6 rounded-full text-sm flex items-center justify-center">{filteredPosts.length}</span>
        </a>

        { notificationBtn && (
            <div 
                aria-labelledby="dropdown_notification"
                data-te-dropdown-menu-ref 
                className="dropdown-notification border sm:w-[35rem] shadow-lg z-[1000] m-0 absolute right-0 top-0 list-none overflow-hidden rounded-lg bg-white focus:outline-none [&[data-te-dropdown-show]]:block dark:bg-[#272727]" 
                >
                <div>
                    <h2 className="dropdown_title bg-[#F0F1F3] py-3 text-2xl m-4 rounded-lg text-center font-sans dark:bg-dark">{langMode == 'BN' ? 'বিজ্ঞপ্তি' : 'Notification'}</h2>   

                    <ul className="my-4 space-y-4 ml-4 overflow-y-scroll max-h-[30rem]">
                        { notificationData.length > 0 && notificationData.map((item, index)=> (      
                            <li className={`group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark ${ item.read_at == null ? 'unread' : ''  }`} key={index} data-notification={item.id} onClick={readNotification}>
                                <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem] ">
                                    <i className="fas fa-badge-check"></i>
                                </div>
                                <div className="flex-1">
                                    <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium dark:text-white">
                                        { item.data.link ? (
                                            <Link to={`/category/${item.data.slug}`} className='stretched-link'>
                                                {langMode == 'BN' ? item.data.message_bn : item.data.message_en}
                                            </Link>
                                        ) : (
                                            langMode == 'BN' ? item.data.message_bn : item.data.message_en
                                        )}
                                    </p>
                                    <p className="leading-normal text-[1.2rem] mt-1 dark:text-white">{ moment(new Date(item.created_at)).startOf('seconds').fromNow() }</p>
                                </div>
                            </li>
                        )) }
                    </ul>   
                    <a href="#" className="dropdown_more bg-[#F0F1F3] p-3 m-4 text-[1.5rem] text-center rounded-lg block dark:bg-dark" onClick={readAllNotification}>{langMode == 'BN' ? 'সবগুলো পঠিত বলে সনাক্ত কর' : 'Mark all as read'}</a>           
                </div>
            </div>
        ) }
    </li>
  )
}

export default Notification