import React, { useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import  { useState } from 'react';
import { Loader } from '../Components/Loader';
import WeatherCard from '../Components/WeatherCard';
import DarkModeToggle from '../Components/DarkModeToggle';
import  '../index.css'
import { ErrorMessage } from '../Components/ErrorMessage';

const Home = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
  
    useEffect(() => {
      const storedHistory = JSON.parse(localStorage.getItem('weatherSearchHistory')) || [];
      setHistory(storedHistory);
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
                    className="text-blue-500 hover:underline"
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
      </div>
    );
  };
  
  export default Home;