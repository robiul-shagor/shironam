import {React, useState} from 'react'

const Notification = () => {
  const [notificationBtn, setNotificationBtn] = useState(false);

  const handleNotificationBtn = event => {
    event.preventDefault();
    setNotificationBtn(!notificationBtn);
  };

  return (
    <li className="relative" >
        <a href="#" 
            className="text-[1.8rem] relative dark:text-white"  
            id="dropdown_notification" 
            aria-expanded="false" 
            data-te-dropdown-toggle-ref 
            data-te-auto-close="outside" onClick={handleNotificationBtn}>
            <i className="fas fa-bell"></i>
            <span className="bg-red-500 absolute text-white -top-3 -right-3 w-6 h-6 rounded-full text-sm flex items-center justify-center">2</span>
        </a>

        { notificationBtn && (
            <div 
                aria-labelledby="dropdown_notification"
                data-te-dropdown-menu-ref 
                className="dropdown-notification border mt-2 sm:w-[35rem] shadow-lg z-[1000] m-0 absolute right-0 top-0 list-none overflow-hidden rounded-lg bg-white focus:outline-none [&[data-te-dropdown-show]]:block dark:bg-[#272727]" 
                >
                <div>
                    <h2 className="dropdown_title bg-[#F0F1F3] py-3 text-2xl m-4 rounded-lg text-center font-sans dark:bg-dark">Notifications</h2>      
                    <ul className="my-4 space-y-4 ml-4 overflow-y-scroll max-h-[30rem]">
                        <li className="group unread flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem] ">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium dark:text-white">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1 dark:text-white">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group unread flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                        <li className="group flex items-center gap-4 p-4 transition-all relative hover:bg-[#F0F1F3] dark:hover:bg-dark [&.unread]:bg-[#F0F1F3] dark:[&.unread]:bg-dark">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center border text-[1.5rem]">
                                <i className="fas fa-badge-check"></i>
                            </div>
                            <div className="flex-1">
                                <p className="truncate max-w-[25rem] text-[1.4rem] leading-normal group-[.unread]:font-medium">
                                    <a href="#" className="stretched-link">
                                        Dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
                                    </a>
                                </p>
                                <p className="leading-normal text-[1.2rem] mt-1">5 hours ago</p>
                            </div>
                        </li>
                    </ul>   
                    <a href="#" className="dropdown_more bg-[#F0F1F3] p-3 m-4 text-[1.5rem] text-center rounded-lg block dark:bg-dark">See all Notifications</a>           
                </div>
            </div>
        ) }

    </li>
  )
}

export default Notification