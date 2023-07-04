import { createContext, useEffect, useState } from "react"
import { Route, Routes } from 'react-router-dom'
import Home from './components/Pages/Home'
import Login from './components/Pages/Login'
import Register from './components/Pages/Register'
import './App.css'
import Search from "./components/Pages/Search"
import EditProfile from "./components/Pages/EditProfile"
import Bookmarks from "./components/Pages/Bookmarks"
import MyInterests from "./components/Pages/MyInterests"
import TodayNews from "./components/Pages/TodayNews"
import BreakingNewsPage from "./components/Pages/BreakingNewsPage"
import CategoryArchive from "./category/CategoryArchive"
import SingleCategory from "./category/SingleCategory"
import ForgetPassword from "./components/Pages/ForgetPassword"
import ResetPassword from "./components/Pages/ResetPassword"
import AboutUs from "./components/Pages/AboutUs"
import Contact from "./components/Pages/Contact"
import Advertisement from "./components/Pages/Advertisement"
import PrivacyPolicy from "./components/Pages/PrivacyPolicy"
import SingleTags from "./category/SingleTags"
import SingleNews from "./components/Pages/SingleNews"
import AfterRegistrationInterests from "./components/Pages/AfterRegistrationInterests"
import SingleCategorySub from "./category/SingleCategorySub"
import RegisterVerify from "./components/Pages/RegisterVerify"



export const UserContext = createContext();

function App() {
  const [userLogin, setUserLogin] = useState(false);
  const [langMode, setLangMode] = useState('EN');

  useEffect(()=> {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));
    const userLang = localStorage.getItem('lang');

    if( userLang ) {
      setLangMode(userLang);
    }

    if( userData ) {
      setUserLogin(userData);
    }
  }, []);

  //console.log(langMode);

  return (
    <>
      <UserContext.Provider
        value={{
          userLogin,
          setUserLogin,
          langMode,
          setLangMode
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
          <Route path="/category/:category" element={<SingleCategory />}  />
          <Route path="/tags/:tags" element={<SingleTags />}  />
          <Route path="/category/:category/:subCategory" element={<SingleCategorySub />}  />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/advertisement" element={<Advertisement />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/:id" element={<SingleNews />} />
          <Route path="/interests" element={<AfterRegistrationInterests />} />
          <Route path="/verify" element={<RegisterVerify />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App
