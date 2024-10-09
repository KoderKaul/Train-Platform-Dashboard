export const parseTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(':').map(Number); 
      return hours * 60 + minutes;
      
      
    } catch (error) {
      //  console.log(p,timeString);
      
    }
  };

export const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const getCurrentTime = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
};

export const calculateDepartureTime = (platform) => {
  const now = new Date();
  const departure = new Date();
  const [hours, minutes] = platform.actualDeparture.split(':').map(Number);
  departure.setHours(hours, minutes, 0);
  const diffInMinutes = Math.round((departure - now) / 60000);
  return diffInMinutes > 0 ? diffInMinutes : 1;
};