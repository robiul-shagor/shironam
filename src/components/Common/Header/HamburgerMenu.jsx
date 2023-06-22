import {React, useState, useEffect} from 'react'
import HamburgerAccordian from './HamburgerAccordian';
import axios from '../../../api/axios';

const HamburgerMenu = () => {
  const [hamburger, setHamburger] = useState(false);
  const [data, setData] = useState([]);
  const [hamburgerToggle, setHamburgerToggle] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userDetails"));

  const handleHamburger = (e) => {
    e.preventDefault();
    setHamburger(!hamburger);
  };

  const getCategory = async() => {
    const bearer_token = `Bearer ${userData.token}`;
    try {
        const config = {
            headers: {
              'Authorization': bearer_token
            }
        };

        await axios.get('/category-list', config)
        .then(res => {
            setData(res.data);
        });
    } catch (e) {
        console.log(e);
    }
  };

  useEffect(()=> {
    getCategory();
  }, [])

  //console.log(data);

  const accordionItems = [
    {
        title: 'News',
        content: [
            {
                url: '#',
                name: 'Bangladesh'
            },    
            {
                url: '#',
                name: 'Politics'
            },        
            {
                url: '#',
                name: 'Crime'
            },   
            {
                url: '#',
                name: 'Environment'
            },    
            {
                url: '#',
                name: 'Education'
            },
        ]
    },    
    {
        title: 'Business',
        content: [
            {
                url: '#',
                name: 'Bangladesh'
            },    
            {
                url: '#',
                name: 'Politics'
            },        
            {
                url: '#',
                name: 'Crime'
            },   
            {
                url: '#',
                name: 'Environment'
            },    
            {
                url: '#',
                name: 'Education'
            },
        ]
    },    
    {
        title: 'World',
        content: [
            {
                url: '#',
                name: 'Bangladesh'
            },    
            {
                url: '#',
                name: 'Politics'
            },        
            {
                url: '#',
                name: 'Crime'
            },   
            {
                url: '#',
                name: 'Environment'
            },    
            {
                url: '#',
                name: 'Education'
            },
        ]
    },
  ];

  return (
    <li className="relative">
        <a href="#" onClick={handleHamburger} 
            className="cat-sidebar-toggler text-2xl border px-4 py-3 rounded-lg border-gray-400 dark:text-white" >
            <i className="fal fa-bars"></i>
        </a>

        { hamburger && (
            <div className="cat_floating_sidebar fixed top-0 right-[-30rem] bottom-0 shadow-lg z-[1000] m-0 list-none rounded-lg bg-white transition-all duration-300 focus:outline-none p-12 text-[1.4rem] space-y-5 w-[30rem] dark:bg-[#272727] [&.active]:right-0 overflow-y-auto active" id="category_slide_dropdown">
                <div className="flex items-center justify-between border-b pb-4 mb-8">
                    <h3 className="font-2xl hidden md:block">Title</h3>
                    <div className="theme_switcher md:hidden">
                        <button className="switcher-input" data-theme="dark">
                            <i className="far fa-moon"></i>
                        </button>
                        <span></span>
                        <button className="switcher-input" data-theme="light">
                            <i className="far fa-sun"></i>
                        </button>
                    </div>
                    <button className="close border px-4 py-2 rounded" onClick={()=> setHamburger(false)} >
                        <i className="fal fa-times"></i>
                    </button>
                </div>

                {accordionItems.map((item, index) => (
                    <HamburgerAccordian key={index} title={item.title} content={item.content} />
                ))}
            </div>
        ) }        
    </li>
  )
}

export default HamburgerMenu