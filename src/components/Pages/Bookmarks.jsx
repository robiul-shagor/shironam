import React from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'

const Bookmarks = () => {
  return (
    <div className='booksmarks-pages'>
      <Header />
      <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
        <div className="container">
            <div className="md:max-w-[70rem] lg:max-w-[80rem] 2xl:max-w-[90rem] mx-auto">
                <h2 className="text-[2rem] md:text-[2.4rem] font-bold mb-10 md:mb-20 dark:text-white">
                    My Bookmarks
                </h2>
    
                <ul className="bookmark-list space-y-12">
                    <li className="flex items-center gap-6 sm:gap-10">
                        <div className="thumb shrink-0">
                            <a href="#">
                                <img src="../assets/media/bookmak-thumb.png" className="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="Bookmark News" />
                            </a>
                        </div>
                        <div className="news_info max-w-[50rem] dark:text-white">
                            <h3 className="font-sans text-[1.4rem] sm:text-[1.6rem] leading-[1.7em] line-clamp-2">
                                <a href="#" className="hover:opacity-80">
                                    The Cabinet today gave final approval to the draft of the “National Identity Card Registration Act, 2023”
                                </a>
                            </h3>
                            <ul className="post_meta flex justify-between pb-2 text-xl mt-4 md:mt-8">
                                <li className="opacity-50">
                                    <i className="far fa-clock"></i>
                                    2 day ago
                                </li>
                                <li>
                                    <a href="#" className="text-blue hover:underline">
                                        View Source
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-auto dark:text-white flex max-md:flex-col max-md:space-y-4 md:space-x-4 lg:space-x-8">
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Share">
                                <i className="fal fa-share"></i>
                            </a>
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Remove">
                                <i className="fal fa-trash-alt"></i>
                            </a>
                        </div>
                    </li>
                    <li className="flex items-center gap-6 sm:gap-10">
                        <div className="thumb shrink-0">
                            <a href="#">
                                <img src="../assets/media/bookmak-thumb1.png" className="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="Bookmark News" />
                            </a>
                        </div>
                        <div className="news_info max-w-[50rem] dark:text-white">
                            <h3 className="font-sans text-[1.4rem] sm:text-[1.6rem] leading-[1.7em] line-clamp-2">
                                <a href="#" className="hover:opacity-80">
                                    One of the train services involved in a triple collision in India’s deadliest railway disaster in decades was set to resume Wednesday, as officials revised the death toll up to 288.
                                </a>
                            </h3>
                            <ul className="post_meta flex justify-between pb-2 text-xl mt-4 md:mt-8">
                                <li className="opacity-50">
                                    <i className="far fa-clock"></i>
                                    2 day ago
                                </li>
                                <li>
                                    <a href="#" className="text-blue hover:underline">
                                        View Source
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-auto dark:text-white flex max-md:flex-col max-md:space-y-4 md:space-x-4 lg:space-x-8">
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Share">
                                <i className="fal fa-share"></i>
                            </a>
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Remove">
                                <i className="fal fa-trash-alt"></i>
                            </a>
                        </div>
                    </li>
                    <li className="flex items-center gap-6 sm:gap-10">
                        <div className="thumb shrink-0">
                            <a href="#">
                                <img src="../assets/media/bookmak-thumb2.png" className="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="Bookmark News" />
                            </a>
                        </div>
                        <div className="news_info max-w-[50rem] dark:text-white">
                            <h3 className="font-sans text-[1.4rem] sm:text-[1.6rem] leading-[1.7em] line-clamp-2">
                                <a href="#" className="hover:opacity-80">
                                    Riseup Labs is a well-known international provider of IT services and technology solutions that help companies rethink their business models and make the transition to the digital age
                                </a>
                            </h3>
                            <ul className="post_meta flex justify-between pb-2 text-xl mt-4 md:mt-8">
                                <li className="opacity-50">
                                    <i className="far fa-clock"></i>
                                    2 day ago
                                </li>
                                <li>
                                    <a href="#" className="text-blue hover:underline">
                                        View Source
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-auto dark:text-white flex max-md:flex-col max-md:space-y-4 md:space-x-4 lg:space-x-8">
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Share">
                                <i className="fal fa-share"></i>
                            </a>
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Remove">
                                <i className="fal fa-trash-alt"></i>
                            </a>
                        </div>
                    </li>
                    <li className="flex items-center gap-6 sm:gap-10">
                        <div className="thumb shrink-0">
                            <a href="#">
                                <img src="../assets/media/bookmak-thumb3.png" className="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="Bookmark News" />
                            </a>
                        </div>
                        <div className="news_info max-w-[50rem] dark:text-white">
                            <h3 className="font-sans text-[1.4rem] sm:text-[1.6rem] leading-[1.7em] line-clamp-2">
                                <a href="#" className="hover:opacity-80">
                                    'Solitary confinement of animals is the same as solitary confinement of humans'
                                </a>
                            </h3>
                            <ul className="post_meta flex justify-between pb-2 text-xl mt-4 md:mt-8">
                                <li className="opacity-50">
                                    <i className="far fa-clock"></i>
                                    2 day ago
                                </li>
                                <li>
                                    <a href="#" className="text-blue hover:underline">
                                        View Source
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-auto dark:text-white flex max-md:flex-col max-md:space-y-4 md:space-x-4 lg:space-x-8">
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Share">
                                <i className="fal fa-share"></i>
                            </a>
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Remove">
                                <i className="fal fa-trash-alt"></i>
                            </a>
                        </div>
                    </li>
                    <li className="flex items-center gap-6 sm:gap-10">
                        <div className="thumb shrink-0">
                            <a href="#">
                                <img src="../assets/media/bookmak-thumb4.png" className="w-32 h-32 md:w-40 md:h-40 rounded-lg" alt="Bookmark News" />
                            </a>
                        </div>
                        <div className="news_info max-w-[50rem] dark:text-white">
                            <h3 className="font-sans text-[1.4rem] sm:text-[1.6rem] leading-[1.7em] line-clamp-2">
                                <a href="#" className="hover:opacity-80">
                                    'When we invest in girls' education, we invest in a nation': S Sudan education minister
                                </a>
                            </h3>
                            <ul className="post_meta flex justify-between pb-2 text-xl mt-4 md:mt-8">
                                <li className="opacity-50">
                                    <i className="far fa-clock"></i>
                                    2 day ago
                                </li>
                                <li className="">
                                    <a href="#" className="text-blue hover:underline">
                                        View Source
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="ml-auto dark:text-white flex max-md:flex-col max-md:space-y-4 md:space-x-4 lg:space-x-8">
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Share">
                                <i className="fal fa-share"></i>
                            </a>
                            <a href="#" className="transition-all opacity-50 hover:opacity-100 hover:text-theme" title="Remove">
                                <i className="fal fa-trash-alt"></i>
                            </a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
      </div>      
    <Footer />
    </div>
  )
}

export default Bookmarks