import React, { useEffect, useState } from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'

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
  const [profileImage, setProfileImage] = useState(null);

  const userData = JSON.parse(sessionStorage.getItem("userDetails"));
  const bearer_token = `Bearer ${userData.token}`;

  const handleFileChange = async(event) => {
    await axios.post('/update-profile-picture', {images: event.target.files[0] }, {headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
    }})
    .then(res => {
      console.log(res.data)
      //setProfileImage(event.target.files[0]);
    });
  }

  const updateProfile = async(event) => {
    event.preventDefault();
      try {
        axios.put('/profile-update', {
          name: firstName +' '+ lastName,
          country_id: contry,
          city_id: city,
          date_of_birth: birthDate,
          gender: gender,
          phone: phone
        })
        .then(res => {
            console.log(res.data);
        });   
    } catch (e) {
        console.log(e);
    }
  }

  useEffect(() => {
    const getData = async() => {
        try {
            const config = {
                headers: {
                  'Authorization': bearer_token
                }
            };

            axios.get('/country-list', config)
            .then(res => {
              setCountryList(res.data.data);
                //console.log(res.data);
            });        
                                   
            
            axios.get('/me', config)
            .then(res => {
              //setCountryList(res.data.data);
                console.log(res.data.normal_user);
                res.data.normal_user.name && setFristName(res.data.normal_user.name);
                res.data.normal_user.email && setEmail(res.data.normal_user.email);
                res.data.normal_user.phone && setPhone(res.data.normal_user.phone);
            });   
            


            
            
            // axios.get('/country-list/{18}', config)
            // .then(res => {
            //   setCityList(res.data.data);
            //     //console.log(res.data);
            // });

        } catch (e) {
            console.log(e);
        }
    };
    getData();
  }, [])

  console.log(profileImage);

  return (
    <div className='edit-profile-wrapper'>
      <Header />
      <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-24 xl:py-32">
        <div className="container">
          <div className="profile-inner max-w-screen-md xl:max-w-screen-lg mx-auto sm:shadow-lg sm:p-28 rounded-lg dark:text-white">
            <h3 className="mb-8 font-sans font-semibold ">Profile Settings</h3>
            <form action="#" className="profile-edit-form" onSubmit={updateProfile}>
              <div className="card flex items-center gap-x-4 mb-20">     
                <input type="file" id="user_profile_photo" hidden onChange={handleFileChange} />
                <img src="../assets/media/user-avatar.png" className="user_profile_photo rounded-full w-[6.2rem] h-[6.2rem]" alt="profile Thumb" />
                <div className="text-inner">
                  <h2 className="font-sans font-bold text-3xl">Alex Jhone</h2>
                  <label htmlFor="user_profile_photo" className="text-blue-600 cursor-pointer text-xl">Change profile photo</label>
                </div>
              </div>

              <h3 className="mb-8 font-sans text-3xl">Personal Information</h3>

              <div className="form-inner">
                  <div className="form-row grid md:grid-cols-2 gap-8">
                      <div className="input-group">
                          <label>First Name</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="f_name" placeholder="Name" required value={ firstName } onChange={(e)=> setFristName( e.target.value )} />
                      </div>
                      <div className="input-group">
                          <label>Last Name</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="l_name" placeholder="Name" value={ lastName } onChange={(e)=> setLastName( e.target.value )} />
                      </div>
                      <div className="input-group">
                          <label>Date of Birth</label>
                          <input type="date" className="form-control dark:bg-slate-800 focus:border-gray-800" name="dob" placeholder="Date of Birth" value={birthDate} required onChange={(e)=> setBirthDate( e.target.value )} />
                      </div>
                      <div className="input-group">
                          <label>Gender</label>
                          <select name="gender" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={gender} onChange={ (e) => setGender( e.target.value ) }>
                              <option value="*">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="others">Others</option>
                          </select>
                      </div>
                      <div className="input-group">
                          <label>Marital Status</label>
                          <select name="marital_status" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={maritalStatus} onChange={ (e) => setMaritalStatus( e.target.value ) }>
                              <option value="*">Select Status</option>
                              <option value="married">Married</option>
                              <option value="unmarried">Unmarried</option>
                              <option value="others">Others</option>
                          </select>
                      </div>
                      <div className="input-group">
                          <label>Occupation</label>
                          <select name="gender" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={occupation} onChange={ (e) => setOccupation( e.target.value ) }>
                              <option value="*">Select Occupation</option>
                              <option value="">Advertising Manager</option>
                              <option value="">Naval Architect</option>
                              <option value="">Accountant (General)</option>
                              <option value="">Tax Accountant</option>
                              <option value="">Civil Engineer</option>
                              <option value="">Cardiologist</option>
                              <option value="">Chef</option>
                              <option value="">Others</option>
                          </select>
                      </div>
                      
                      <div className="input-group">
                          <label>Country</label>
                          <select name="country" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={contry} onChange={ (e) => setCountry( e.target.value ) }>
                              <option value="*">Select Country</option>
                              { contryList && contryList.map((item, index) => (
                                <option value={item.id} key={ index }>{item.name}</option>
                              )) }
                          </select>
                      </div>
                      <div className="input-group">
                          <label>City</label>
                          <select name="country" className="form-control dark:bg-slate-800 !ring-0 outline-none focus:border-gray-800" value={city} onChange={ (e) => setCity( e.target.value ) }>
                              <option value="*">Select City</option>
                              <option value="10">Dhaka</option>

                          </select>
                      </div>
                  </div>
              </div>
              <div className="my-20"></div>
              <h3 className="mb-8 font-sans text-3xl">Contact Information</h3>
              <div className="form-inner">
                  <div className="form-row space-y-8">
                      <div className="input-group">
                          <label>Email</label>
                          <input type="email" className="form-control dark:bg-slate-800 focus:border-gray-800" name="email" placeholder="jhone_alex@yahoo.com" value={email} onChange={ (e) => setEmail( e.target.value ) } required />
                      </div>
                      <div className="input-group">
                          <label>Phone</label>
                          <input type="text" className="form-control dark:bg-slate-800 focus:border-gray-800" name="phone" placeholder="+880 1616 121212" value={phone} onChange={ (e) => setPhone( e.target.value ) } required />
                      </div>
                      <div className="form-submit">
                          <button type="submit" className="w-full bg-theme text-white py-5 rounded-lg hover:bg-blue-700 transition">
                              Update
                          </button>
                      </div>
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