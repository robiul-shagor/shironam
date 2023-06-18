import {React, useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const SearchBtn = () => {
    const [searchbtn, setSerchBtn] = useState(false);
    const [searchData, setSerchData] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();

    const handleSearchBtn = event => {
        event.preventDefault();
        setSerchBtn(!searchbtn);
    };  
  
    const searchHandler = event => {
        event.preventDefault();

        const keyword = event.target.value;
        // Update the search parameter in the URL
        searchParams.set('keyword', keyword);
        setSearchParams(searchParams);
  
        //sessionStorage.setItem("userSearch", JSON.stringify(event.target.value));
        navigate('/search');
    };
    
  return (
    <li className="relative max-[767px]:hidden">
        <a href="#" className="text-2xl md:text-3xl dark:text-white" 
            id="dropdown_search" 
            aria-expanded="false" onClick={handleSearchBtn}>
            <i className="fal fa-search"></i>
        </a>
        
        { searchbtn && (
            <div                             
                aria-labelledby="dropdown_search"
                data-te-dropdown-menu-ref 
                className="z-[1000] m-0 absolute min-w-max overflow-hidden border-none bg-white bg-clip-padding focus:outline-none [&[data-te-dropdown-show]]:block text-[1.4rem] xl:!-top-4"
                >
                <form action="search.html" className="sm:w-[30rem] md:w-[35rem] xl:w-[50rem]" onSubmit={searchHandler}>
                    <div className="form-group">
                        <input type="search" name="s" placeholder="Search..." className="text-2xl h-16 px-6 w-full focus:shadow-none focus:outline-none focus:border-gray-800" autoComplete="off" value={searchData} onChange={(e) => setSerchData(e.target.value)} />
                    </div>
                </form>
            </div>
        ) }
    </li>
  )
}

export default SearchBtn