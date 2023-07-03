import React, { useEffect, useState, useContext} from 'react';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import axios from '../../api/axios';
import { UserContext } from '../../App';

const MyInterests = () => {
  const [interestsData, setInterestsData] = useState([]);
  const [isCheckedList, setIsCheckedList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [defaultInt, setDefaultInt] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("userDetails"));
  const bearer_token = `Bearer ${userData.token}`;
  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const { langMode } = useContext(UserContext);

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
  
    const getDefault = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get('/me', config);
        const obj = JSON.parse(res.data.normal_user.interest);
        setDefaultInt(obj);
        setCheckboxState(obj); // Set checkbox state based on defaultInt values
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const setCheckboxState = (obj) => {
      const updatedCheckedList = interestsData.map((item) =>
        Object.values(obj).includes(item.id.toString())
      );
      setIsCheckedList(updatedCheckedList);
    };
  
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([getData(), getDefault()]);
      setIsLoading(false);
    };
  
    fetchData();
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
      });
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className='interest-pages'>
      <Header />
      <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-24">
        <div className="container">
          <h1 className="text-4xl font-semibold dark:text-white">{langMode == 'BN' ? 'আপনার আগ্রহ সেট করুন' : 'Set your interest'}</h1>
          <p className="text-xl mt-3">{langMode == 'BN' ? 'আপনার শীর্ষ আগ্রহের খবর নির্বাচন করুন' : 'Select your top interest news'}</p>
          <form className="interest_form mt-8 lg:mt-16 dark:text-white" onSubmit={handleSubmit}>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-7">
              {interestsData.length > 0 &&
                interestsData.map((item, index) => (
                  <li key={index}>
                    <div className="form-check mt-6 mb-7 group">
                      <input
                        type="checkbox"
                        value={item.id}
                        id={item.name_en}
                        checked={isCheckedList[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                        name={`${item.name_en}-${index}`}
                      />
                      <label className="font-semibold" htmlFor={item.name_en}>
                        { langMode == 'BN' ? item.name_bn : item.name_en }
                      </label>
                    </div>
                    {(isCheckedList[index] || Object.values(defaultInt).includes(item.id.toString())) && (
                      <div className="!visible">
                        <h3 className="subcategory font-sans mb-8 font-medium underline underline-offset-[6px]">
                          {langMode == 'BN' ? 'সাব ক্যাটাগরি নির্বাচন করুন' : 'Select Sub Categories'}
                        </h3>
                        <ul className="space-y-8">
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
                                  <label htmlFor={`${data.name_en}-${idex}`} className="text-[1.5rem]">
                                    { langMode == 'BN' ? data.name_bn : data.name_en }
                                  </label>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
            <div className="form_footer flex gap-8 py-16 justify-center">
              <button type="submit" className="basis-1/2 border border-[#F9020B] rounded-lg py-4 text-center text-2xl bg-[#F9020B] text-white">
                { langMode == 'BN' ? 'সম্পন্ন' : 'Done' }
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyInterests;
