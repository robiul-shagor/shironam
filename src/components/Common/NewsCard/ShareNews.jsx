function ShareNews(plaform, title) {
    const shareOnFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
      };
    
      const shareOnTwitter = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        window.open(twitterUrl, '_blank');
      };
    
      const shareOnWhatsApp = () => {
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`;
        window.open(whatsappUrl, '_blank');
      };
    
      const shareOnLinkedIn = () => {
        const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
        window.open(linkedinUrl, '_blank');
      };
  return (
    <div>
        <button onClick={shareOnFacebook}>Share on Facebook</button>
        <button onClick={shareOnTwitter}>Share on Twitter</button>
        <button onClick={shareOnWhatsApp}>Share on WhatsApp</button>
        <button onClick={shareOnLinkedIn}>Share on LinkedIn</button>
    </div>
  )
}

export default ShareNews