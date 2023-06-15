import { createContext, React, useEffect, useState } from "react"
import { Link, Route, Routes } from 'react-router-dom'
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



export const UserContext = createContext();

function App() {
  const [userLogin, setUserLogin] = useState(false);

  useEffect(()=> {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    if( userData ) {
      setUserLogin(userData);
    }
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          userLogin,
          setUserLogin
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
          <Route path="/category/:category/:category" element={<SingleCategory />}  />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App