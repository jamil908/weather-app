import Lottie from "lottie-react";
import { CgCloud } from "react-icons/cg";
import { FaRainbow } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { MdOutlineCompress, MdVisibility } from "react-icons/md";
import weatherAnimation from '../assets/weatherAnimation.json'
const WeatherCard = ({ data }) => {
  const { name, main, weather, wind, sys, visibility } = data;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-6 text-center  dark:bg-gray-700 rounded-lg p-6 shadow-md w-8/12 mx-auto">
   <div className=" grid  md:grid-cols-2 grid-cols-1 mx-auto justify-center items-center " >
    <div>
    <Lottie animationData={weatherAnimation} className=" w-4/12 h-6/12"></Lottie> 
     
    </div>
    <div><h2 className="text-2xl font-semibold mb-2">
        {name}, {sys.country}
      </h2>
     
      <p className="text-5xl font-bold">{Math.round(main.temp)}°C</p>
      <p className="capitalize text-xl mb-4">{weather[0].description}</p></div>
   </div>
      <div>
    

      <div className="grid grid-cols-2 gap-4 text-left text-sm mt-4">
        <p><span className="font-semibold">Feels Like:</span> {Math.round(main.feels_like)}°C</p>
        <p><span className="font-semibold">Max / Min:</span> {main.temp_max}°C / {main.temp_min}°C</p>
        <p><span className="font-semibold">Humidity:</span> <FaRainbow className="inline" /> {main.humidity}%</p>
        <p><span className="font-semibold">Wind:</span> <CgCloud className="inline" /> {wind.speed} m/s</p>
        <p><span className="font-semibold">Gust:</span> {wind.gust || 'N/A'} m/s</p>
        <p><span className="font-semibold">Pressure:</span> <MdOutlineCompress className="inline" /> {main.pressure} hPa</p>
        <p><span className="font-semibold">Visibility:</span> <MdVisibility className="inline" /> {visibility / 1000} km</p>
        <p><span className="font-semibold">Sunrise:</span> <WiSunrise className="inline" /> {formatTime(sys.sunrise)}</p>
        <p><span className="font-semibold">Sunset:</span> <WiSunset className="inline" /> {formatTime(sys.sunset)}</p>
      </div>
      </div>
    </div>
  );
};

export default WeatherCard;
