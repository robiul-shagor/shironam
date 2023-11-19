import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../../App';

const DateToday = () => {
  const { langMode } = useContext(UserContext);
    const [currentTime, setCurrentTime] = useState(new Date());
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentTime(new Date());
        }, 1000); // Update time every second
    
        return () => {
          clearInterval(interval);
        };
      }, [currentTime]);
    
      const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    
      const formattedTime = currentTime.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });      
      
      const formattedDateBN = currentTime.toLocaleDateString('bn-BD', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });
    
      const formattedTimeBN = currentTime.toLocaleTimeString('bn-BD', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
  return (
    <div className="date_time mr-auto ml-7 self-end text-xl hidden md:block dark:text-white" id="todayDate">
      { ( langMode == 'BN' ) ? formattedDateBN + ' ' +formattedTimeBN : formattedDate + ' ' +formattedTime }
    </div>
  )
}

export default DateToday