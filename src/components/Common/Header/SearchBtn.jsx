import { Link } from 'react-router-dom'

const SearchBtn = () => {
    return (
        <li className="relative max-[767px]:hidden">
            <Link to="/search" className='text-2xl md:text-3xl dark:text-white'><i className="fal fa-search"></i></Link>
        </li>
    )
}

export default SearchBtn