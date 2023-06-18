import React, { useState } from 'react'
import Header from '../Common/Header/Header'
import Footer from '../Common/Footer/Footer'
import axios from '../../api/axios'


const Search = () => {
  const [ serach, setSearch ] = useState('');
  
  return (
    <div className='dark:bg-dark'>
        <Header />
        <div className="main_content mt-[8.7rem] sm:mt-[10rem] md:mt-[9rem] lg:mt-[9.4rem] xl:mt-[8.5rem] py-16 md:py-24 xl:py-32">
          <div className="container">
              <div className="search-inner text-center">
                  <form action="#" className="max-w-screen-lg mx-auto">
                      <div className="form-group flex items-stretch border rounded-lg dark:border-0">
                          <input type="text" name="s" className="form-control border-0 dark:bg-slate-800 dark:text-white dark:placeholder:text-white" value={serach} onChange={(e)=> setSearch(e.target.value)} placeholder="Search..." autoComplete="off" />
                          <button type="submit" className="whitespace-nowrap px-6 border-l bg-theme text-white dark:border-transparent">
                              <i className="far fa-search text-3xl"></i>
                          </button>
                      </div>
                  </form>
              </div>

              <div className="news_wrapper w-full max-w-screen-lg mx-auto mt-20 dark:text-white">
                  <hr/>

                  <p className="mb-8 mt-16">Displaying 1-10 results out of 45 for <b>"news"</b> </p>
                  <div className="block_news space-y-12">

                      <div className="news_item sm:grid grid-cols-12 gap-12 relative group">
                          <div className="news_thumbnail sm:col-span-5 md:col-span-4 rounded-xl overflow-hidden">
                              <a href="#" className="stretched-link">
                                  <img src="../assets/media/block-news_thumb.png" className="w-full h-full object-cover object-center" alt="news title"/>
                              </a>
                          </div>
                          <div className="news_content sm:col-span-7 md:col-span-8 flex flex-col shrink-0 py-6">
                              <h3 className="font-semibold leading-[1.7em] group-hover:text-theme line-clamp-3">
                                  differences in the association of sleep quality and cat verses dog ownership may be because cats tend to be more active at night
                              </h3>
                              <ul className="post_meta flex justify-between border-b pb-2 text-xl mt-8 md:mt-auto">
                                  <li>
                                      <i className="far fa-clock"></i>
                                      1hr ago
                                  </li>
                                  <li>
                                      Read More <i className="fal fa-arrow-up rotate-45"></i>
                                  </li>
                              </ul>
                          </div>
                      </div>

                      <div className="news_item sm:grid grid-cols-12 gap-12 relative group">
                          <div className="news_thumbnail sm:col-span-5 md:col-span-4 rounded-xl overflow-hidden">
                              <a href="#" className="stretched-link">
                                  <img src="../assets/media/block-news_thumb2.png" className="w-full h-full object-cover object-center" alt="news title"/>
                              </a>
                          </div>
                          <div className="news_content sm:col-span-7 md:col-span-8 flex flex-col shrink-0 py-6">
                              <h3 className="font-semibold leading-[1.7em] group-hover:text-theme line-clamp-3">
                                  'That's not good for cricket. ICC needs to step in here': Australia great blasts 'pathetic' India act in Nagpur
                              </h3>
                              <ul className="post_meta flex justify-between border-b pb-2 text-xl mt-8 md:mt-auto">
                                  <li>
                                      <i className="far fa-clock"></i>
                                      1hr ago
                                  </li>
                                  <li>
                                      Read More <i className="fal fa-arrow-up rotate-45"></i>
                                  </li>
                              </ul>
                          </div>
                      </div>

                      <div className="news_item sm:grid grid-cols-12 gap-12 relative group">
                          <div className="news_thumbnail sm:col-span-5 md:col-span-4 rounded-xl overflow-hidden">
                              <a href="#" className="stretched-link">
                                  <img src="../assets/media/block-news_thumb3.png" className="w-full h-full object-cover object-center" alt="news title"/>
                              </a>
                          </div>
                          <div className="news_content sm:col-span-7 md:col-span-8 flex flex-col shrink-0 py-6">
                              <h3 className="font-semibold leading-[1.7em] group-hover:text-theme line-clamp-3">
                                  'That's not good for cricket. ICC needs to step in here': Australia great blasts 'pathetic' India act in Nagpur
                              </h3>
                              <ul className="post_meta flex justify-between border-b pb-2 text-xl mt-8 md:mt-auto">
                                  <li>
                                      <i className="far fa-clock"></i>
                                      1hr ago
                                  </li>
                                  <li>
                                      Read More <i className="fal fa-arrow-up rotate-45"></i>
                                  </li>
                              </ul>
                          </div>
                      </div>

                      <div className="news_item sm:grid grid-cols-12 gap-12 relative group">
                          <div className="news_thumbnail sm:col-span-5 md:col-span-4 rounded-xl overflow-hidden">
                              <a href="#" className="stretched-link">
                                  <img src="../assets/media/block-news_thumb4.png" className="w-full h-full object-cover object-center" alt="news title"/>
                              </a>
                          </div>
                          <div className="news_content sm:col-span-7 md:col-span-8 flex flex-col shrink-0 py-6">
                              <h3 className="font-semibold leading-[1.7em] group-hover:text-theme line-clamp-3">
                                  'That's not good for cricket. ICC needs to step in here': Australia great blasts 'pathetic' India act in Nagpur
                              </h3>
                              <ul className="post_meta flex justify-between border-b pb-2 text-xl mt-8 md:mt-auto">
                                  <li>
                                      <i className="far fa-clock"></i>
                                      1hr ago
                                  </li>
                                  <li>
                                      Read More <i className="fal fa-arrow-up rotate-45"></i>
                                  </li>
                              </ul>
                          </div>
                      </div>

                  </div>

              </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default Search 