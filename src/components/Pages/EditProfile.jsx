import { useEffect, useState, useContext } from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'
import { UserContext } from '../../App'

const EditProfile = () => {
  const [firstName, setFristName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [occupation, setOccupation] = useState('');
  const [contry, setCountry] = useState('');
  const [contryList, setCountryList] = useState([]);
  const [city, setCity] = useState('');
  const [cityList, setCityList] = useState([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imgSuccess, setImgSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [staticdata, setStaticData] = useState('');

  const { langMode, userLogin, siteSetting } = useContext( UserContext );

  const bearer_token = `Bearer ${userLogin.token}`;

  const config = {
      headers: {
        'Authorization': bearer_token
      }
  }; 

  const handleFileChange = async(event) => {
    const file = event.target.files[0];

    await axios.post('/update-profile-picture', { image: file }, {headers: {
      'Authorization': bearer_token,
      'Content-Type': 'multipart/form-data',
    }})
    .then(res => {
      setProfileImage( siteSetting.base_url  +'/'+ res.data.image);
      setImgSuccess(res.data.status);
    });
  }

  const updateProfile = async(event) => {
    event.preventDefault();
    try {
      await axios.put('/profile-update', {
        name: firstName,
        last_name: lastName,
        country_id: parseInt(contry),
        city_id: parseInt(city),
        date_of_birth: birthDate,
        gender: parseInt(gender),
        phone: phone,
        marital_status: parseInt(maritalStatus),
        occupations: parseInt(occupation)
      }, {headers: {
        'Authorization': bearer_token
      }})
      .then(res => {
        if( res.data.status == 'Error' ) {
          setError('error');
          setErrorMessage(res.data.message);
        } else {
          setSuccess('success');
          setSuccessMessage(res.data.message);
        }
      });
    } catch (e) {
        setError(e.response.data.status);
        setErrorMessage(Object.values(e.response.data.message));
    }
  }

  const handleCountryChange = (event) => {
    setCountry(event.target.value); // Update the selectedOption state
  };

  // Perform any desired actions when the select option changes
  useEffect(() => {
    contry && axios.get('/city-list/'+ contry, config)
    .then(res => {
      setCityList(res.data.cities);
    });
  }, [contry]); // Include contry as a dependency

  useEffect(()=> {
    const get_country_list = async() => {
      try {
        await axios.get('/country-list', config)
        .then(res => {
          setCountryList(res.data.data);
            //console.log(res.data);
        });                     
      } catch (e) {
          console.log(e);
      }      
    }
    get_country_list()
  }, [])

  useEffect(()=> {
    const user_details_update = async() => {
      try {
        await axios.get('/me', config)
        .then(res => {
          console.log(res)
          //setCountryList(res.data.data);
            res.data.normal_user.name && setFristName(res.data.normal_user.name);
            res.data.normal_user.last_name && setLastName(res.data.normal_user.last_name);
            res.data.normal_user.email && setEmail(res.data.normal_user.email);
            res.data.normal_user.phone && setPhone(res.data.normal_user.phone);
            res.data.normal_user.dob && setBirthDate(res.data.normal_user.dob);
            res.data.normal_user.marital_status && setMaritalStatus(res.data.normal_user.marital_status);
            res.data.normal_user.occupations && setOccupation(JSON.parse(res.data.normal_user.occupations)[0]);
            res.data.normal_user.country && setCountry(res.data.normal_user.country);
            res.data.normal_user.city && setCity(res.data.normal_user.city);
            res.data.normal_user.gender && setGender(res.data.normal_user.gender);
            res.data.normal_user.image && setProfileImage( siteSetting.base_url  +'/'+ res.data.normal_user.image);            
            console.log(res.data.normal_user)
        });                    
      } catch (e) {
          console.log(e);
      }      
    }
    user_details_update()
  }, [])  
  

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
                <img src={ profileImage ? profileImage : '../assets/media/user-avatar.png' } className="user_profile_photo rounded-full w-[6.2rem] h-[6.2rem]" alt="profile Thumb" width="68" height='68' />
                <div className="text-inner">
                  <h2 className="font-sans font-bold text-3xl">{ firstName +' '+ lastName }</h2>
                  <label htmlFor="user_profile_photo" className="text-blue-600 cursor-pointer text-xl">{ langMode == 'BN' ? 'প্রোফাইল ফটো পরিবর্তন করুন' : 'Change profile photo' }</label>
                </div>
              </div>

              {imgSuccess && (<div>{ langMode == 'BN' ? 'প্রোফাইল ছবি আপডেট সফল' : 'Profile Picture update successfull' }</div>)}

              <h3 className="mb-8 font-sans text-3xl">{ langMode == 'BN' ? 'ব্যক্তিগত তথ্য' : 'Personal Information' }</h3>

              <div className="form-inner">
                  <div className="form-row grid md:grid-cols-2 gap-8">
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'নামের প্রথম অংশ' : 'First Name' }</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="f_name" placeholder="Name" required value={ firstName } onChange={(e)=> setFristName( e.target.value )} />
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
                              { staticdata &&  staticdata.genders.map( (item, index) => (
                                <option value={item.id} key={ index }>{item.name_en}</option>
                              ) ) }
                          </select>
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'বৈবাহিক অবস্থা' : 'Marital Status' }</label>
                          <select name="marital_status" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={maritalStatus} onChange={ (e) => setMaritalStatus( e.target.value ) }>
                              <option value="*">Select Status</option>
                              { staticdata &&  staticdata.marital_status.map( (item, index) => (
                                <option value={item.id} key={ index }>{item.name_en}</option>
                              ) ) }
                          </select>
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'পেশা' : 'Occupation' }</label>
                          <select name="gender" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={occupation} onChange={ (e) => setOccupation( e.target.value ) }>
                              <option value="*">Select Occupation</option>
                              { staticdata &&  staticdata.occupations.map( (item, index) => (
                                <option value={item.id} key={ index }>{item.name_en}</option>
                              ) ) }
                          </select>
                      </div>
                      
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'দেশ' : 'Country' }</label>
                          <select name="country" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={contry} onChange={ handleCountryChange }>
                              <option value="*">Select Country</option>
                              { contryList && contryList.map((item, index) => (
                                <option value={item.id} key={ index }>{item.name}</option>
                              )) }
                          </select>
                      </div>
                      <div className="input-group">
                          <label>{ langMode == 'BN' ? 'শহর' : 'City' }</label>
                          <select name="country" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={city} onChange={ (e) => setCity( e.target.value ) }>
                              <option value="*">Select City</option>
                              { cityList && cityList.map((item, index) => (
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