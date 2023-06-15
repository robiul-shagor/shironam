import React, { useState } from 'react';

const HamburgerAccordian = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion-item">
            <div className="flex items-center justify-between gap-4 cursor-pointer select-none py-2"aria-expanded="true" onClick={toggleAccordion}>
                {title}
                <i className={`fal px-4 py-2 ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
            </div>
            
            {isOpen && ( <div className="!visible">
                <ul className="text-[1.4rem] space-y-3 p-4 ml-4 list-disc">
                    {content.map((item, index) => (            
                        <li className="before:content-['&#8212;'] before:mr-1 before:text-[#D6D6D6]" key={index}>
                            <a href={item.url}>{item.name}</a>
                        </li>
                    ))}
                </ul>
            </div> 
            )}
        </div>
    )
}

export default HamburgerAccordian