import React, { useContext } from 'react'
import { UserContext } from '../../../App';

const PopupNews = () => {
    const { langMode } = useContext(UserContext);
    const closeHandle = () => {
        const currentModal = document.getElementById('readMoreNews');
        const currentiframe = document.getElementById('displayPopupSource');
        currentModal.style.display = "none";
        currentiframe.src = '';
    }

    return (
        <div className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-dark/[.6]" tabIndex="-1" aria-labelledby="readMoreNews" aria-hidden="true" id="readMoreNews">
            <div data-te-modal-dialog-ref
                className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
                <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                    <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 py-6 px-10 lg:px-20 dark:border-opacity-50">

                        <h4 className="text-[2rem] font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            { langMode == 'BN' ? 'মূল উৎস' : 'Original Source' }
                        </h4>
  
                        <button type="button" className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none text text-[2rem]" onClick={closeHandle}>
                            <i className="fal fa-times"></i>
                        </button>
                    </div>

                    <div className="relative flex-auto py-8 px-6 lg:px-20">
                        <iframe id="displayPopupSource" src="" className="bg-white w-full h-[50rem]" frameBorder="0"></iframe>

                    </div>

                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 py-6 px-10 lg:px-20 dark:border-opacity-50">
                        <button type="button" className="bg-red-600 text-white px-8 py-3 rounded-lg"  onClick={closeHandle}>{ langMode == 'BN' ? 'বন্ধ' : 'Close' }</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupNews