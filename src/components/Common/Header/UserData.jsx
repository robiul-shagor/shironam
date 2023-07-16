import { useContext, useState, useEffect} from 'react'
import { UserContext } from '../../../App'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../../api/axios'

const UserData = () => {
  const { userLogin, setUserLogin } = useContext(UserContext);
  const [userAllMenu, setUserAllMenu] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  const { langMode } = useContext(UserContext);


   //Get user details
  const userData = JSON.parse(sessionStorage.getItem("userDetails"));

  const navigate = useNavigate();

  const userMenuhandle = (e) => {
    e.preventDefault();
    setUserAllMenu(!userAllMenu);
  };

  const bearer_token = `Bearer ${userData.token}`;
  const config = {
      headers: {
        'Authorization': bearer_token
      }
  }
  
  useEffect(()=> {
    const user_details_update = async() => {
      try {
        await axios.get('/me', config)
        .then(res => {
            const baseURL = 'https://shironam-backend.themestransmit.com/' 
            ;
            res.data.normal_user.image && setProfileImage( baseURL + res.data.normal_user.image);            
        });                    
      } catch (e) {
          console.log(e);
      }      
    }
    user_details_update()
  }, [])  
  

  useEffect(() => {
    const handleDocumentClick = (e) => {
      const isSocialDropdown = e.target.closest('.user-profile-menu');
      const isSocialTrigger = e.target.closest('#user_profile_menu');
  
      if (!isSocialDropdown && !isSocialTrigger) {
        setUserAllMenu(false);
      }
    };
  
    document.body.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.body.removeEventListener('click', handleDocumentClick);
    };
}, []);

  const hanndleLogout = async(event) => {
    event.preventDefault();

    const bearer_token = `Bearer ${userData.token}`;

    try {
        await axios.post('/logout', {}, {headers: {
            'Authorization': bearer_token
        }})
        .then(res => {
            sessionStorage.setItem("userDetails", JSON.stringify(null));
            setUserLogin(false);
            navigate("/");
        });
    } catch (e) {
        console.log(e);
    }
  }

  
  return (
    <li className="relative ml-auto">
        <a href="#" id="user_profile_menu" className="text-2xl flex items-center gap-2 md:gap-3 md:text-[1.8rem] xl:text-2xl dark:text-white" data-te-dropdown-toggle-ref data-te-auto-close="outside" onClick={userMenuhandle}>
            <img src={ profileImage ? profileImage : '../assets/media/user-avatar.png' } className="user-img w-[3rem] h-[3rem] rounded-full" alt="" />
            <span>{userData && userData.normal_user && userData.normal_user.name}</span>
        </a>

        { userAllMenu && (
            <div 
                aria-labelledby="user_profile_menu"
                data-te-dropdown-menu-ref 
                className="user-profile-menu border absolute right-0 min-w-max auto z-10 rounded-md p-12 bg-white shadow-lg [&[data-te-dropdown-show]]:block overflow-hidden dark:bg-[#272727]" 
                >
                <div role="none">
                    <h4 className="font-sans mb-4 text-[1.4rem]">{ langMode == 'BN' ? 'আমার প্রোফাইল' : 'My Profile'}</h4>
                    <div className="flex items-center gap-x-6">
                        <img src={ profileImage ? profileImage : '../assets/media/user-avatar.png' } className="rounded-full" alt="" />
                        <div>
                            <h3 className="font-sans text-[1.6rem] font-medium">{userData && userData.normal_user && userData.normal_user.name}</h3>
                            <p className="leading-normal mb-2 dark:text-white">{userData && (userData.normal_user.email)}</p>
                            <Link to="/edit-profile" className='btn bg-green-600 text-white px-7 py-3 rounded-lg text-xl'>
                                { langMode == 'BN' ? 'জীবন বৃত্তান্ত সম্পাদনা' : 'Edit Profile'}
                            </Link>                                  
                        </div>
                    </div>
                    <hr className="my-8" />
                    <ul className="space-y-4">
                        <li>
                            <Link to='/my-interests' className='text-2xl'>
                                <i className="fal fa-star w-8"></i> { langMode == 'BN' ? 'আমার আগ্রহ' : 'My Interests'} 
                            </Link>   
                        </li>
                        <li>
                            <Link to='/bookmarks' className='text-2xl'>
                                <i className="fal fa-bookmark w-8"></i> { langMode == 'BN' ? 'বুকমার্ক' : 'Bookmarks'}
                            </Link>
                        </li>
                        <li>
                            <a href="#" onClick={hanndleLogout} className="text-2xl">
                                <i className="fal fa-sign-out w-8"></i> { langMode == 'BN' ? 'লগআউট' : 'Logout'} 
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        ) }


    </li>
  )
}

export default UserData