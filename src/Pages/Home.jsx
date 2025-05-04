import React, { useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import  { useState } from 'react';
import { Loader } from '../Components/Loader';
import WeatherCard from '../Components/WeatherCard';
import DarkModeToggle from '../Components/DarkModeToggle';
import  '../index.css'
import { ErrorMessage } from '../Components/ErrorMessage';
import { FaCarCrash, FaSmog, FaSun, FaTemperatureLow, FaTint, FaUmbrella } from 'react-icons/fa';
import { Fade, Zoom } from 'react-awesome-reveal';
import { WiDaySunny } from 'react-icons/wi';

const Home = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      const storedHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
      setHistory(storedHistory);
    }, []);
    useEffect(() => {
      if (history.length === 0) {
        fetchWeather('Chittagong');
      }
    }, []);
    const fetchWeather = async (city) => {
      setLoading(true);
      setError('');
      try {
        const API_KEY ="9dcc819b34d924048393ec609f254bbf"; 
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
  
        if (!response.ok) throw new Error(' City could not be found. Please try again.');
        const data = await response.json();
        setWeather(data);
  
        // Update search history
        const updatedHistory = [city, ...history.filter((item) => item !== city)].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen  ">
        <h1 className="text-3xl text-center pt-8 font-bold">Weather App</h1>
        <DarkModeToggle />
        <SearchBar onSearch={fetchWeather} />
       
        {history.length > 0 && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">Search History</h2>
            <ul className="flex justify-center space-x-4 mt-2">
              {history.map((city, index) => (
                <li key={index}>
                  <button
                    className=" hover:underline"
                    onClick={() => fetchWeather(city)}
                  >
                    {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weather && <WeatherCard data={weather} />}

{/* Section 1: Weather Tips */}
{ (
  <div className="mt-8 px-6">
      <Zoom>
      <h2 className="text-2xl font-bold text-center mb-4 flex items-center justify-center gap-2">
  <WiDaySunny className="text-3xl text-yellow-500" />
  Today’s Weather Tips
</h2>      </Zoom>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-center">
        {/* Card 1 */}
        <Fade direction="up" triggerOnce>
          <div className="bg-yellow-100 text-gray-700 p-4 rounded shadow">
            <FaTint className="mx-auto text-3xl mb-2 text-blue-600" />
            <Zoom>
              <h3 className="font-semibold text-lg mb-2">Stay Hydrated</h3>
            </Zoom>
            <Fade delay={200}>
              <p>Carry a water bottle if it’s hot outside.</p>
            </Fade>
          </div>
        </Fade>

        {/* Card 2 */}
        <Fade direction="up" triggerOnce>
          <div className="bg-blue-100 text-gray-700 p-4 rounded shadow">
            <FaUmbrella className="mx-auto text-3xl mb-2 text-indigo-600" />
            <Zoom>
              <h3 className="font-semibold text-lg mb-2">Carry an Umbrella</h3>
            </Zoom>
            <Fade delay={200}>
              <p>Just in case — even if skies are clear now!</p>
            </Fade>
          </div>
        </Fade>

        {/* Card 3 */}
        <Fade direction="up" triggerOnce>
          <div className="bg-gray-100 text-gray-700 p-4 rounded shadow">
            <FaTemperatureLow className="mx-auto text-3xl mb-2 text-gray-500" />
            <Zoom>
              <h3 className="font-semibold text-lg mb-2">Wear Layers</h3>
            </Zoom>
            <Fade delay={200}>
              <p>Mornings might be chilly, even if the day warms up.</p>
            </Fade>
          </div>
        </Fade>

        {/* Card 4 */}
        <Fade direction="up" triggerOnce>
          <div className="bg-green-100 text-gray-700 p-4 rounded shadow">
            <FaSun className="mx-auto text-3xl mb-2 text-yellow-500" />
            <Zoom>
              <h3 className="font-semibold text-lg mb-2">Use Sunscreen</h3>
            </Zoom>
            <Fade delay={200}>
              <p>Protect your skin even on cloudy days.</p>
            </Fade>
          </div>
        </Fade>

        {/* Card 5 */}
        <Fade direction="up" triggerOnce>
          <div className="bg-red-100 text-gray-700 p-4 rounded shadow">
            <FaCarCrash className="mx-auto text-3xl mb-2 text-red-600" />
            <Zoom>
              <h3 className="font-semibold text-lg mb-2">Drive Safely</h3>
            </Zoom>
            <Fade delay={200}>
              <p>Roads might be slippery during rain or fog.</p>
            </Fade>
          </div>
        </Fade>

        {/* Card 6 */}
        <Fade direction="up" triggerOnce>
          <div className="bg-purple-100 text-gray-700 p-4 rounded shadow">
            <FaSmog className="mx-auto text-3xl mb-2 text-purple-600" />
            <Zoom>
              <h3 className="font-semibold text-lg mb-2">Check Air Quality</h3>
            </Zoom>
            <Fade delay={200}>
              <p>Limit outdoor activity if pollution is high.</p>
            </Fade>
          </div>
        </Fade>
      </div>
    </div>
)}

{/* Section 2: Fun Weather Facts */}
{ (
  <div className="mt-10 px-6 pb-8">
    <h2 className="text-2xl font-bold text-center mb-4">🌈 Fun Weather Facts</h2>
    <ul className="list-disc list-inside text-center  dark:text-gray-100">
      <li>Lightning is hotter than the surface of the sun!</li>
      <li>The highest temperature ever recorded on Earth was 56.7°C (134°F).</li>
      <li>Clouds look white because they reflect sunlight.</li>
    </ul>
  </div>
)}

      </div>
    );
  };
  
  export default Home;