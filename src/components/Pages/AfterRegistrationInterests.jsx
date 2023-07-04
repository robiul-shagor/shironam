import React, { useEffect, useState, useContext } from 'react';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const AfterRegistrationInterests = () => {
  const [interestsData, setInterestsData] = useState([]);
  const [isCheckedList, setIsCheckedList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userDetails"));
  const bearer_token = `Bearer ${userData.token}`;
  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const { langMode } = useContext(UserContext);
  const navigate = useNavigate();

  const onSkip = (e) => {
    navigate('/');
  };

  const handleCheckboxChangeValue = (event, parentCategoryId) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, { parentCategoryId, value }]);
    } else {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((selectedValue) => !(selectedValue.parentCategoryId === parentCategoryId && selectedValue.value === value))
      );
    }
  };  

  const handleCheckboxChange = (index) => {
    const updatedCheckedList = [...isCheckedList];
    updatedCheckedList[index] = !updatedCheckedList[index];
    setIsCheckedList(updatedCheckedList);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/interest-list', config);
        setInterestsData(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    getData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedCheckboxValues = interestsData.reduce((selectedValues, item, index) => {
      if (isCheckedList[index]) {
        return [...selectedValues, item.id];
      }
      return selectedValues;
    }, []);

    const selectedSubcategoryValues = selectedValues.reduce((subcategoryValues, selectedValue) => {
      const [dataNameEn, parentCategoryId] = selectedValue.value.split('-');
      const parentCategory = interestsData.find((item) => item.id == parentCategoryId);
      
      if (parentCategory) {
        const subcategoryValue = parentCategory.interest.find((data) => data.name_en == dataNameEn);
        if (subcategoryValue) {
          return [...subcategoryValues, subcategoryValue.id];
        }
      }
      
      return subcategoryValues;
    }, []);
    
    try {
      const finalChoice = [...selectedCheckboxValues, ...selectedSubcategoryValues];
      axios.put('/update-interest', {
        interests: finalChoice.toString()
      }, {headers: {
        'Authorization': bearer_token
      }})
      .then(res => {
        setSuccess(true);
        navigate('/');
      });
    } catch (e) {
      setError(true);
    }
  };
  
  return (
    <div className='interest-pages'>
      <header className="fixed top-0 left-0 right-0 bg-white py-6 shadow-md shadow-black/10 z-[1024]">
          <div className="brand-logo text-center">
              <Link 
                  to="/"
                  className="inline-block max-[575px]:-ml-8"
              >
                  <img src="/assets/media/logo.svg" className="max-[1199px]:w-[12rem] dark:show" alt="shironam.com" />
                  <img src="/assets/media/logo-dark.svg" className="max-[1199px]:w-[12rem] hidden dark:hidden" alt="shironam.com" />
              </Link>
          </div>
      </header>      

      <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-24">
        <div className="container">
          <h1 className="text-4xl font-semibold dark:text-white">{langMode == 'BN' ? 'আপনি কি আগ্রহী তা আমাদের বলুন৷' : 'Tell us what you are interested in'}</h1>
          <form className="interest_form mt-8 lg:mt-16 dark:text-white" onSubmit={handleSubmit}>
            <div className="items_wrapper grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-10">
              {interestsData.length > 0 && interestsData.map((item, index) => (
              <div className="item group relative z-[1] before:content-[''] before:inset-0 before:absolute before:bg-black before:opacity-25 before:z-[1] before:rounded-xl" key={index}>
                  <img 
                      src={item.image} 
                      className="w-full h-[180px] sm:h-[220px] object-cover object-center rounded-xl" 
                      alt="Interest Title" />

                  <p className="name absolute bottom-5 left-5 text-white font-medium text-3xl z-10">
                      #{ langMode == 'BN' ? item.name_bn : item.name_en }
                  </p>
                  <input
                    type="checkbox"
                    value={item.id}
                    id={item.name_en}
                    checked={isCheckedList[index] || false}
                    onChange={() => handleCheckboxChange(index)}
                    name={`${item.name_en}-${index}`}
                    className="hidden"
                  />
                  <label htmlFor={item.name_en}
                      className="check-circle absolute top-6 right-6 z-10 w-12 h-12 bg-slate-50 rounded-full m-0 cursor-pointer">
                  </label>

                  {isCheckedList[index] && (
                    <div className="!visible interest-list-dropdown">
                      <h3 className="subcategory font-sans mb-4 text-xl underline underline-offset-[6px]">
                        {langMode == 'BN' ? 'সাব ক্যাটাগরি নির্বাচন করুন' : 'Select Sub Categories'}
                      </h3>
                      <ul className="space-y-4">
                        {item.interest.length > 0 &&
                          item.interest.map((data, idex) => (
                            <li key={idex}>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  value={`${data.name_en}-${item.id}`}
                                  id={`${data.name_en}-${idex}`}
                                  checked={selectedValues.some(
                                    (selectedValue) => selectedValue.parentCategoryId === item.id && selectedValue.value === `${data.name_en}-${item.id}`
                                  )}
                                  onChange={(event) => handleCheckboxChangeValue(event, item.id)}
                                  name={`${data.name_en}-${item.id}`}
                                />
                                <label htmlFor={`${data.name_en}-${idex}`} className="text-xl">
                                  { langMode == 'BN' ? data.name_bn : data.name_en }
                                </label>
                              </div>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
              </div>
            ))}
            </div>

            <div className="form_footer flex gap-8 py-16">
              <button className="basis-1/2 border border-gray-400 rounded-lg py-4 text-center text-2xl transition-all hover:bg-gray-400 hover:border-gray-400 hover:text-white" onClick={onSkip}>
                { langMode == 'BN' ? 'এড়িয়ে যান' : 'Skip' }
              </button>
              <button type="submit" className="basis-1/2 border border-[#F9020B] rounded-lg py-4 text-center text-2xl bg-[#F9020B] text-white">
                { langMode == 'BN' ? 'সম্পন্ন' : 'Done' }
              </button>
            </div>
          </form>

          <div>{isLoading && ( langMode == 'BN' ? 'লোড হচ্ছে...' : 'Loading...')}</div>
          <div>{error && ( langMode == 'BN' ? 'ত্রুটি হচ্ছে...' : 'Error...' )}</div>
          { success && (
              <div className="flex items-center bg-theme_blue text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p className='text-white'>{langMode == 'BN' ? 'Your interests updated' : 'আপনার আগ্রহ আপডেট করা হয়েছে'}</p>
              </div>
            ) }
        </div>
      </div>
    </div>
  );
};

export default AfterRegistrationInterests;
