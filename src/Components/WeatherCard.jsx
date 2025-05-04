import Lottie from "lottie-react";
import { CgCloud } from "react-icons/cg";
import { FaRainbow } from "react-icons/fa";
import { WiSunrise, WiSunset } from "react-icons/wi";
import { MdOutlineCompress, MdVisibility } from "react-icons/md";
import weatherAnimation from '../assets/weatherAnimation.json';

const WeatherCard = ({ data }) => {
  const { name, main, weather, wind, sys, visibility } = data;

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-6 mx-auto w-11/12 md:w-8/12 rounded-xl border shadow-lg p-6 transition-all duration-300 bg-blue-300 dark:bg-black/80 backdrop-blur-md text-gray-800 dark:text-gray-100">
      <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-6">
        <div className="flex justify-center">
          <Lottie animationData={weatherAnimation} className="w-40 h-40" />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-2">{name}, {sys.country}</h2>
          <p className="text-5xl font-bold">{Math.round(main.temp)}°C</p>
          <p className="capitalize text-xl mt-2">{weather[0].description}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6 text-sm">
        <p><span className="font-semibold">Feels Like:</span> {Math.round(main.feels_like)}°C</p>
        <p><span className="font-semibold">Max / Min:</span> {main.temp_max}°C / {main.temp_min}°C</p>
        <p><span className="font-semibold">Humidity:</span> <FaRainbow className="inline text-blue-400" /> {main.humidity}%</p>
        <p><span className="font-semibold">Wind:</span> <CgCloud className="inline text-gray-400" /> {wind.speed} m/s</p>
        <p><span className="font-semibold">Gust:</span> {wind.gust || 'N/A'} m/s</p>
        <p><span className="font-semibold">Pressure:</span> <MdOutlineCompress className="inline text-red-400" /> {main.pressure} hPa</p>
        <p><span className="font-semibold">Visibility:</span> <MdVisibility className="inline text-green-400" /> {visibility / 1000} km</p>
        <p><span className="font-semibold">Sunrise:</span> <WiSunrise className="inline text-yellow-500" /> {formatTime(sys.sunrise)}</p>
        <p><span className="font-semibold">Sunset:</span> <WiSunset className="inline text-orange-500" /> {formatTime(sys.sunset)}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
