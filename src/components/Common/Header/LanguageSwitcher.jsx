import  { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../App';
const LanguageSwitcher = () => {
    const [ langBtn, setLangBtn ] = useState(false);
    const { langMode, setLangMode } = useContext(UserContext);

    const handleLang = (e) => {
        e.preventDefault();
        setLangBtn(!langBtn);
    }

    useEffect(() => {
        const handleDocumentClick = (e) => {
          const isSocialDropdown = e.target.closest('.lang-dropdown');
          const isSocialTrigger = e.target.closest('#dropdown_lang');
      
          if (!isSocialDropdown && !isSocialTrigger) {
            setLangBtn(false);
          }
        };
      
        document.body.addEventListener('click', handleDocumentClick);
      
        return () => {
          document.body.removeEventListener('click', handleDocumentClick);
        };
    }, []);

    const handleLangMode = (e) => {
        e.preventDefault();
        const currentLang = e.currentTarget.getAttribute('data-lang');
        setLangMode(currentLang);
        setLangBtn(false);
        localStorage.setItem('lang', currentLang);
    }

    useEffect(() => {
        document.getElementById('root').className = langMode;
    }, [langMode]); 

    return (
        <li className="relative">
            <a href="#" 
                className="text-2xl dark:text-white" id="dropdown_lang" 
                onClick={handleLang} >
                <span>{langMode}</span>
                <i className="fas fa-caret-down"></i>
            </a>

            { langBtn && (
                <div 
                    aria-labelledby="dropdown_lang"
                    data-te-dropdown-menu-ref 
                    className="shadow-lg z-[1000] m-0 absolute right-0 min-w-max list-none overflow-hidden rounded-lg border bg-white bg-clip-padding focus:outline-none [&[data-te-dropdown-show]]:block md:w-[15rem] dark:bg-[#272727] lang-dropdown" 
                    >
                    <div>
                        <a href="#" onClick={handleLangMode} data-lang="EN" className="text-gray-700 hover:bg-gray-800 hover:text-white block px-6 py-4 text-2xl dark:text-white">
                            EN - English
                        </a>
                        <a href="#" onClick={handleLangMode} data-lang="BN" className="text-gray-700 hover:bg-gray-800 hover:text-white block px-6 py-4 text-2xl dark:text-white">
                            BN - Bangla
                        </a>                                
                    </div>
                </div>
            ) }

        </li>
    )
}

export default LanguageSwitcher