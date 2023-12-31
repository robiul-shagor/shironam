import { useEffect, useState, useContext } from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'
import { UserContext } from '../../App'

const EditProfile = () => {
  const { langMode, baseURL } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const bearer_token = `Bearer ${userData.token}`;
  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [country, setCountry] = useState('');
  const [countryList, setCountryList] = useState([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [staticData, setStaticData] = useState({});

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newRePass, setNewRePass] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await axios.post('/update-profile-picture', formData, config);
      setProfileImage(baseURL + '/' + res.data.image);
      setSuccess('success');
      setSuccessMessage(langMode === 'BN' ? 'প্রোফাইল ছবি আপডেট সফল' : 'Profile Picture update successful');
      window.location.reload();
    } catch (error) {
      setError('error');
      setErrorMessage(langMode === 'BN' ? 'প্রোফাইল ছবি আপডেট ব্যর্থ' : 'Failed to update profile picture');
    }
  };

  const updateProfile = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        name: firstName,
        last_name: lastName,
        country_id: parseInt(country),
        city_id: parseInt(city),
        date_of_birth: birthDate,
        gender: parseInt(gender),
        phone: phone,
        marital_status: parseInt(maritalStatus),
        occupations: parseInt(occupation)
      };

      if( currentPass ) {
        payload.old_password = currentPass;
      }

      if( newPass ) {
        payload.new_password = newPass;
      }

        // Perform confirmation password validation
      if (newPass !== newRePass) {
        setError('error');
        setErrorMessage(langMode === 'BN' ? "নতুন পাসওয়ার্ড এবং নিশ্চিত পাসওয়ার্ড মেলে না" : "New password and confirm password do not match");
        return;
      }

      if( newRePass ) {
        payload.confirm_password = newRePass;
      }

      const res = await axios.put('/profile-update', payload, config);
      console.log(res);
      if (res.data.status === 'Error') {
        setError('error');
        
       // setErrorMessage(langMode === 'BN' ? res.data.message_bn : res.data.message);
      } else {
        setSuccess('success');
        setSuccessMessage(langMode === 'BN' ? res.data.message_bn : res.data.message);
      }
    } catch (e) {
      setError('error');
      setErrorMessage(e.response?.data?.message || (langMode === 'BN' ? 'ত্রুটি হয়েছে' : 'Error occurred'));
    }
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('/personal-static-data', config);
        setStaticData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function getUserData() {
      try {
        const res = await axios.get('/me', config);
        const userData = res.data.normal_user;
        setFirstName(userData.name || '');
        setLastName(userData.last_name || '');
        setEmail(userData.email || '');
        setPhone(userData.phone || '');
        setBirthDate(userData.dob || '');
        setMaritalStatus(userData.marital_status || '');
        setOccupation(userData.occupations ? JSON.parse(userData.occupations)[0] : '');
        setCountry(userData.country || '');
        setCity(userData.city || '');
        setGender(userData.gender || '');
        setProfileImage(userData?.image ? baseURL + '/' + userData.image : null);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getUserData();
  }, []);

  useEffect(() => {
    async function getCountryList() {
      try {
        const res = await axios.get('/country-list', config);
        setCountryList(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCountryList();
  }, []);

  useEffect(() => {
    async function getCityList() {
      try {
        if (country) {
          const res = await axios.get(`/city-list/${country}`, config);
          setCityList(res.data.cities);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCityList();
  }, [country]);
  
  useEffect(() => {
    const getData = async() => {
        try {                            
            await axios.get('/personal-static-data', config)
            .then(res => {
              setStaticData(res.data);
            });   
        } catch (e) {
            console.log(e);
        }
    };
    getData();
  }, [])

    
  return (
    <div className='edit-profile-wrapper'>
      <Header />
      <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-24 xl:py-32">
        <div className="container">
          <div className="profile-inner max-w-screen-md xl:max-w-screen-lg mx-auto sm:shadow-lg sm:p-28 rounded-lg dark:text-white">
            <h3 className="mb-8 font-sans font-semibold ">{ langMode == 'BN' ? 'প্রোফাইল সেটিংস' : 'Profile Settings' }</h3>
            <form action="#" className="profile-edit-form" onSubmit={updateProfile}>
              <div className="card flex items-center gap-x-4 mb-20">     
                <input type="file" id="user_profile_photo" hidden onChange={handleFileChange} />
                <img src={ (profileImage && profileImage !== null) ? profileImage : '../assets/media/user-avatar.png' } className="user_profile_photo rounded-full w-[6.2rem] h-[6.2rem]" alt="profile Thumb" width="68" height='68' />
                <div className="text-inner">
                  <h2 className="font-sans font-bold text-3xl">{ firstName +' '+ lastName }</h2>
                  <label htmlFor="user_profile_photo" className="text-blue-600 cursor-pointer text-xl">{ langMode == 'BN' ? 'প্রোফাইল ফটো পরিবর্তন করুন' : 'Change profile photo' }</label>
                </div>
              </div>

              {successMessage && (<div>{ langMode == 'BN' ? 'প্রোফাইল ছবি আপডেট সফল' : 'Profile Picture update successfull' }</div>)}

              <h3 className="mb-8 font-sans text-3xl">{ langMode == 'BN' ? 'ব্যক্তিগত তথ্য' : 'Personal Information' }</h3>

              <div className="form-inner">
                  <div className="form-row grid md:grid-cols-2 gap-8">
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'নামের প্রথম অংশ' : 'First Name' }</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="f_name" placeholder="Name" required value={ firstName } onChange={(e)=> setFirstName( e.target.value )} />
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'নামের শেষাংশ' : 'Last Name' }</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="l_name" placeholder="Name" value={ lastName } onChange={(e)=> setLastName( e.target.value )} />
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'জন্ম তারিখ' : 'Date of Birth' }</label>
                          <input type="date" className="form-control dark:bg-slate-800 focus:border-gray-800" name="dob" placeholder="Date of Birth" value={birthDate} required onChange={(e)=> setBirthDate( e.target.value )} />
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'লিঙ্গ' : 'Gender' }</label>
                          <select name="gender" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={gender} onChange={ (e) => setGender( e.target.value ) }>
                              <option value="*">{ langMode == 'BN' ? 'লিঙ্গ নির্বাচন' : 'Select Gender' }</option>
                              {staticData?.genders?.map((item, index) => (
                                <option value={item.id} key={index}>{item.name_en}</option>
                              ))}
                          </select>
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'বৈবাহিক অবস্থা' : 'Marital Status' }</label>
                          <select name="marital_status" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={maritalStatus} onChange={ (e) => setMaritalStatus( e.target.value ) }>
                              <option value="*">Select Status</option>
                              {staticData?.marital_status?.map((item, index) => (
                                <option value={item.id} key={index}>{item.name_en}</option>
                              ))}
                          </select>
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'পেশা' : 'Occupation' }</label>
                          <select name="gender" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={occupation} onChange={ (e) => setOccupation( e.target.value ) }>
                              <option value="*">Select Occupation</option>
                              {staticData?.occupations?.map((item, index) => (
                                <option value={item.id} key={index}>{item.name_en}</option>
                              ))}
                          </select>
                      </div>
                      
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'দেশ' : 'Country' }</label>
                          <select name="country" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={country} onChange={ handleCountryChange }>
                              <option value="*">Select Country</option>
                              { countryList?.map((item, index) => (
                                <option value={item.id} key={ index }>{item.name}</option>
                              )) }
                          </select>
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'শহর' : 'City' }</label>
                          <select name="country" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={city} onChange={ (e) => setCity( e.target.value ) }>
                              <option value="*">Select City</option>
                              { cityList?.map((item, index) => (
                                <option value={item.id} key={ index }>{item.name}</option>
                              )) }
                          </select>
                      </div>
                  </div>
              </div>
              <div className="my-20"></div>
              <h3 className="mb-8 font-sans text-3xl">{ langMode == 'BN' ? 'যোগাযোগের তথ্য' : 'Contact Information' }</h3>
              <div className="form-inner">
                  <div className="form-row space-y-8">
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'ইমেইল' : 'Email' }</label>
                          <input type="email" className="form-control dark:bg-slate-800 focus:border-gray-800" name="email" placeholder="jhone_alex@yahoo.com" disabled readOnly value={email} onChange={ (e) => setEmail( e.target.value ) } required style={{opacity: 0.45}} />
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'ফোন' : 'Phone' }</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="phone" disabled readOnly placeholder="+880 1616 121212" value={phone} onChange={ (e) => setPhone( e.target.value ) } required style={{opacity: 0.45}} />
                      </div>
                  </div>
              </div>
              <div className="my-20"></div>
              <h3 className="mb-8 font-sans text-3xl">{ langMode == 'BN' ? 'পাসওয়ার্ড পরিবর্তন করুন' : 'Change Password' }</h3>
              <div className="form-inner">
                  <div className="form-row space-y-8">
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'বর্তমান পাসওয়ার্ড' : 'Current Password' }</label>
                          <input type="password" className="form-control dark:bg-slate-800 focus:border-gray-800" name="email" value={currentPass} onChange={ (e) => setCurrentPass( e.target.value ) } style={{opacity: 0.45}} />
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'নতুন পাসওয়ার্ড' : 'New Password' }</label>
                          <input type="password" className="form-control dark:bg-slate-800 focus:border-gray-800" name="phone" value={newPass} onChange={ (e) => setNewPass( e.target.value ) } style={{opacity: 0.45}} />
                      </div>             
                      
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'নতুন পাসওয়ার্ড পুনরায় টাইপ করুন' : 'Retype New Password' }</label>
                          <input type="password" className="form-control dark:bg-slate-800 focus:border-gray-800" name="phone" value={newRePass} onChange={ (e) => setNewRePass( e.target.value ) } style={{opacity: 0.45}} />
                      </div>

                      <div className="form-submit">
                          <button type="submit" className="w-full bg-theme text-white py-5 rounded-lg hover:bg-blue-700 transition">
                              { langMode == 'BN' ? 'হালনাগাদ' : 'Update' }
                          </button>
                      </div>
                      
                      { error && (
                        <div className="flex items-center bg-theme text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                            <p className='text-white'>{errorMessage}</p>
                        </div>
                      ) }

                      { success && (
                        <div className="flex items-center bg-theme_blue text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                            <p className='text-white'>{successMessage}</p>
                        </div>
                      ) }                      
                  </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default EditProfile