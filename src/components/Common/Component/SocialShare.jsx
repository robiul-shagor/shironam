import React from 'react'
import axios from '../../../api/axios';

function SocialShare({ title, url }) {
    const userData = JSON.parse(sessionStorage.getItem("userDetails"));

    const shareOnSocialMedia = (platform) => {
        let shareUrl = '';
    
        switch (platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`;
            break;
        default:
            break;
        }

        if( userData !== null ) {
            const bearer_token = `Bearer ${userData.token}`;

            const config = {
                headers: {
                  'Authorization': bearer_token
                }
            };

            const parts = url.split("/");
            const news_id = parts.slice(3).join("/");

            try {           
                axios.post('/share-news', {news_id: news_id, platform}, {headers: {
                    'Authorization': bearer_token
                }})
                .then(res => { 
                    if( res.data.status == "Success" ) {
                        window.open(shareUrl, '_blank');
                    }
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            if (shareUrl !== '') {
                window.open(shareUrl, '_blank');
            }
        }
    
    };

    return (
        <ul className="shadow-lg z-[1000] m-0 absolute right-0 min-w-max list-none overflow-hidden rounded-lg border bg-white bg-clip-padding focus:outline-none [&[data-te-dropdown-show]]:block md:w-[15rem] dark:bg-[#272727] bottom-7">
            <li><button onClick={() => shareOnSocialMedia('facebook')} className='text-gray-700 hover:bg-gray-800 hover:text-white block px-6 py-4 text-xl dark:text-white w-full'>Facebook</button></li>
            <li><button onClick={() => shareOnSocialMedia('twitter')} className='text-gray-700 hover:bg-gray-800 hover:text-white block px-6 py-4 text-xl dark:text-white w-full'>Twitter</button></li>
            <li><button onClick={() => shareOnSocialMedia('linkedin')} className='text-gray-700 hover:bg-gray-800 hover:text-white block px-6 py-4 text-xl dark:text-white w-full'>LinkedIn</button></li>
            <li><button onClick={() => shareOnSocialMedia('whatsapp')} className='text-gray-700 hover:bg-gray-800 hover:text-white block px-6 py-4 text-xl dark:text-white w-full'>WhatsApp</button></li>
        </ul>
    )
}

export default SocialShare