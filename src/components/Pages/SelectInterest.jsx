import React from 'react'

function SelectInterest() {
    return (
        <div>
            <Header />
            <div className="main_content mt-[8.7rem] sm:mt-[8.5rem] md:mt-[7.5rem] xl:mt-[8.5rem] py-24">
                <div className="container">
                    <h1 className="text-4xl font-semibold">
                        Tell us what you're interested in
                    </h1>

                    <form action="#" className="interest_form mt-12">
                    { interest && interest.map((data, index)=> (
                        <div className='item-main' key={index}>
                        <div className='item-container'>
                            <h4 className='item-header text-2xl font-semibold'>{ data.name_en }</h4>
                            <div className="items_wrapper grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-10">
                            {console.log(data.interest)}
                            { data.interest.map( (item, indexs) => (
                                <div className="item group relative z-[1] before:content-[''] before:inset-0 before:absolute before:bg-black before:opacity-25 before:z-[1] before:rounded-xl" data-te-dropdown-ref key={indexs}>
                                    <img 
                                        src="../assets/media/interest1.png" 
                                        className="w-full h-[180px] sm:h-[220px] object-cover object-center rounded-xl" 
                                        alt="Interest Title" />

                                    <p className="name absolute bottom-5 left-5 text-white font-medium text-3xl z-10">
                                        #{item.name_en}
                                    </p>
                                    
                                    <input type="checkbox" className="hidden" id={item.name_en} value={item.id} />
                                    <label htmlFor={item.name_en}
                                        className="check-circle absolute top-6 right-6 z-10 w-12 h-12 bg-slate-50 rounded-full m-0 cursor-pointer">
                                    </label>
                                </div>
                            ) ) }
                            </div>
                        </div>
                        </div>
                    )) }

                    <div className="form_footer flex gap-8 py-16">
                        <button 
                            className="basis-1/2 border border-gray-400 rounded-lg py-4 text-center text-2xl transition-all hover:bg-gray-400 hover:border-gray-400 hover:text-white">
                            Skip
                        </button>
                        <button 
                            className="basis-1/2 border border-[#F9020B] rounded-lg py-4 text-center text-2xl bg-[#F9020B] text-white">
                            Done
                        </button>
                    </div>
                    </form>
                </div>
            </div>      
            <Footer />
        </div>
    )
}

export default SelectInterest