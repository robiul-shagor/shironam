import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const HamburgerAccordian = ({ data, isOpen, toggleAccordion }) => {
    const { langMode } = useContext(UserContext);

    // const toggleAccordion = () => {
    //     setIsOpen(!isOpen);
    // };

    const makeLowercase = ( item ) => {
        return item.split(" ").join("-").toLowerCase()
    }

    return (
        <div className="accordion-item">
            <div className="flex items-center justify-between gap-4 cursor-pointer select-none py-2"aria-expanded="true" onClick={toggleAccordion}>
                { langMode == 'BN' ? data.name_bn : data.name_en }
                <i className={`fal px-4 py-2 ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </div>
            
            {isOpen && ( <div className="!visible">
                <ul className="text-[1.4rem] space-y-3 p-4 ml-4 list-disc">
                    {data.interest && data.interest.map((item, index) => (            
                        <li className="before:content-['&#8212;'] before:mr-1 before:text-[#D6D6D6]" key={index}>
                            <Link to={`/category/${makeLowercase(data.name_en)}/${makeLowercase(item.name_en)}`}>
                                { langMode == 'BN' ? item.name_bn : item.name_en }
                            </Link>
                        </li>
                    ))}
                </ul>
            </div> 
            )}
        </div>
    )
}

export default HamburgerAccordian