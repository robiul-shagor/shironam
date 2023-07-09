import { useEffect, useState} from 'react'

const ThemeSwitcherMobile = () => {
    const [isDarkMode, setIsDarkMode] = useState(
    () =>
        localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };
    
  return (
    <div className="theme_switcher md:hidden">
        <button className="switcher-input" data-theme="dark" onClick={handleToggle}>
            <i className="far fa-moon"></i>
        </button>
        <span></span>
        <button className="switcher-input" data-theme="light" onClick={handleToggle}>
            <i className="far fa-sun"></i>
        </button>
    </div>
  )
}

export default ThemeSwitcherMobile