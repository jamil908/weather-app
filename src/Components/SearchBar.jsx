import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
      setCity('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center mt-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="px-4 py-2 border rounded-l-md"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
