import { useEffect, useState, useContext} from 'react';
import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import axios from '../../api/axios';
import { UserContext } from '../../App';
import Spinner from '../Elements/Spinner';

const MyInterests = () => {
  const [interestsData, setInterestsData] = useState([]);
  const [isCheckedList, setIsCheckedList] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [btnVisable, setBtnVisable] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [parnetInterest, setParnetInterest] = useState(false);

  const { langMode } = useContext(UserContext);
  const userData = JSON.parse(localStorage.getItem("userDetails"));

  const bearer_token = `Bearer ${userData.token}`;
  const config = {
    headers: {
      'Authorization': bearer_token
    }
  };

  const handleCheckboxChangeValue = (event, parentCategoryId) => {
    const { value, checked } = event.target;
    setBtnVisable(true);
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
    setBtnVisable(true);
    setIsCheckedList(updatedCheckedList);
  };

  useEffect(() => {
    const getData = async (retryCount = 3, delay = 1000) => {
      try {
        setIsLoading(true);
        const res = await axios.get('/interest-list', config);
        setInterestsData(res.data.data);
        setParnetInterest( res.data.data.length )
      } catch (error) {
        if (retryCount > 0 && error.response?.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          getData(retryCount - 1, delay * 2); 
        } else {
            console.log(error);
            setLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getDefault = async (retryCount = 3, delay = 1000) => {
      try {
        setIsLoading(true);
        const res = await axios.get('/me', config);
        const obj = JSON.parse(res.data.normal_user.interest);
        setCheckboxState(obj); // Set checkbox state based on defaultInt values
      } catch (error) {
        if (retryCount > 0 && error.response?.status === 429) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          getDefault(retryCount - 1, delay * 2); 
        } else {
            console.log(error);
            setLoading(false);
        }
      } finally {
        setIsLoading(false);
      }
    };

    const setCheckboxState = (obj) => {
      const updatedCheckedList = interestsData.map((item) =>
        Object.values(obj).slice(0, parnetInterest).includes(item.id.toString())
      );    
      
      const subcategories = interestsData.flatMap((item) => {
        const subcategory = item.interest.map((subcategory) => `${subcategory.name_en}-${item.id}`);
      
        const matchingSubcategories = subcategory
          .filter((subdata) => {
            const [name, parentCategoryId] = subdata.split('-');
            const subcategoryValue = item.interest.find((data) => data.name_en === name);
            return Object.values(obj).slice(parnetInterest).includes(subcategoryValue.id.toString());
          })
          .map((matchingSubcategory) => {
            const [name, parentCategoryId] = matchingSubcategory.split('-');
            return { parentCategoryId: parseInt(parentCategoryId), value: matchingSubcategory };
          });
      
        return matchingSubcategories;
      });      
      
      setIsCheckedList(updatedCheckedList);
      setSelectedValues(subcategories);
    };

    getDefault()
    
  }, [interestsData]); 

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

    setLoading(true);
    
    try {
      // First 4 should be parent category
      // rest are child cateogry
      const finalChoice = [...selectedCheckboxValues, ...selectedSubcategoryValues];
      console.log(finalChoice.toString())
      axios.put('/update-interest', {
        interests: finalChoice.toString()
      }, {headers: {
        'Authorization': bearer_token
      }})
      .then(res => {
        console.log(res)
        setSuccess(true);
      });
    } catch (e) {
      setError(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // Your original className with the interest-submit class
  const originalClassName = 'basis-1/2 border border-[#F9020B] rounded-lg py-4 text-center text-2xl bg-[#F9020B] text-white interest-submit';

  // Conditionally render the className based on btnVisible
  const btnClassNames = btnVisable ? originalClassName.replace(' interest-submit', '') : originalClassName;

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
                    {isCheckedList[index]  && (
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
              { !isLoading && (
                <button type="submit" className={btnClassNames}>
                  { loading ? (
                    <Spinner />
                  ) : (
                    langMode == 'BN' ? 'সম্পন্ন' : 'Done'
                  ) }
                </button>
              ) }
            </div>
          </form>
          <div className='text-center'>{isLoading && <Spinner />}</div>
          <div>{error && ( langMode == 'BN' ? 'ত্রুটি হচ্ছে...' : 'Error...' )}</div>
          { success && (
              <div className="flex items-center bg-theme_blue text-white text-sm font-bold mt-8 px-4 py-3" role="alert">
                  <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
                  <p className='text-white'>{langMode == 'BN' ? 'আপনার আগ্রহ আপডেট করা হয়েছে' : 'Your interests updated'}</p>
              </div>
            ) }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyInterests;
