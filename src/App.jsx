import { createContext, useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import axios from "./api/axios";
import { Helmet } from "react-helmet";
import './App.css';

import Home from './components/Pages/Home';
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import Search from "./components/Pages/Search";
import EditProfile from "./components/Pages/EditProfile";
import Bookmarks from "./components/Pages/Bookmarks";
import MyInterests from "./components/Pages/MyInterests";
import TodayNews from "./components/Pages/TodayNews";
import BreakingNewsPage from "./components/Pages/BreakingNewsPage";
import CategoryArchive from "./category/CategoryArchive";
import SingleCategory from "./category/SingleCategory";
import ForgetPassword from "./components/Pages/ForgetPassword";
import ResetPassword from "./components/Pages/ResetPassword";
import AboutUs from "./components/Pages/AboutUs";
import Contact from "./components/Pages/Contact";
import Advertisement from "./components/Pages/Advertisement";
import PrivacyPolicy from "./components/Pages/PrivacyPolicy";
import SingleTags from "./category/SingleTags";
import SingleNews from "./components/Pages/SingleNews";
import AfterRegistrationInterests from "./components/Pages/AfterRegistrationInterests";
import SingleCategorySub from "./category/SingleCategorySub";
import RegisterVerify from "./components/Pages/RegisterVerify";

//export const UserContext = createContext();

export const UserContext = createContext({
  userLogin: false,
  langMode: 'BN',
  siteSetting: '',
  footerSetting: '',
  globalPageNum: '',
});

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [langMode, setLangMode] = useState('EN');
  const [siteSetting, setSiteSettings] = useState('');
  const [footerSetting, setFooterSettings] = useState('');
  const [globalPageNum, setGlobalPageNum] = useState('');

  const userData = JSON.parse(localStorage.getItem("userDetails"));
  const userLang = localStorage.getItem('lang');

  useEffect(() => {
    setLangMode(userLang || 'BN');
    setUserLogin(userData || false);
  }, []);

  useEffect(() => {
    const getSettings = async (retryCount = 3, delay = 1000) => {
      try {
        const res = await axios.get('/site-settings', {});
        const settingsData = JSON.parse(res.data[0]?.value || "{}");
        const footerData = JSON.parse(res.data[1]?.value || "{}");

        setSiteSettings(settingsData);
        setFooterSettings(footerData);
      } catch (error) {
        if ((retryCount > 0 && error.response?.status === 429) || error.response?.status === 500) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          getSettings(retryCount - 1, delay * 2);
        } else {
          console.log(error);
        }
      }
    };
    getSettings();
  }, []);

  const pageTitle = langMode === 'BN' ? `${siteSetting?.site_name_bn} | ${siteSetting?.tagline_bn}` : `${siteSetting?.site_name_en} | ${siteSetting?.tagline_en}`;

  const baseURL = 'https://admin.shironam.live';

  return (
    <>
      <Helmet>
        <title>{siteSetting && pageTitle}</title>
      </Helmet>

      <UserContext.Provider
        value={{
          userLogin,
          setUserLogin,
          langMode,
          setLangMode,
          siteSetting,
          footerSetting,
          globalPageNum,
          setGlobalPageNum,
          baseURL
        }}
      >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/search' element={<Search />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/my-interests' element={<MyInterests />} />
          <Route path='/today-news' element={<TodayNews />} />
          <Route path='/breaking-news' element={<BreakingNewsPage />} />
          <Route path='/category' element={<CategoryArchive />} />
          <Route path="/category/:category" element={<SingleCategory />} />
          <Route path="/tags/:tags" element={<SingleTags />} />
          <Route path="/category/:category/:subCategory" element={<SingleCategorySub />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/news/:id" element={<SingleNews />} />
          <Route path="/interests" element={<AfterRegistrationInterests />} />
          <Route path="/verify" element={<RegisterVerify />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App;
