import React, { useState } from 'react';
import './Weather.css'; // Optional: agar CSS file banayi hai to

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '751d66e130befad396405dc13796a57c'; // <-- API key

  const getWeather = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const res = await fetch(url);

      if (!res.ok) throw new Error('City not found!');

      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-[#4aacb1] to-[#66d8d3] flex flex-col items-center justify-center p-4'>
      <h1 className='text-3xl md:text-5xl font-bold text-white mb-6'>Weather App</h1>
      
      <form onSubmit={getWeather} className='flex flex-col md:flex-row gap-4'>
        <input
          type='text'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder='Enter city name'
          className='px-4 py-2 rounded w-[250px] outline-none'
        />
        <button
          type='submit'
          className='bg-white text-[#4aacb1] px-6 py-2 rounded font-semibold hover:bg-gray-100 transition'
        >
          Get Weather
        </button>
      </form>
   {/*  Conditional Rendering.... */}
      {loading && <p className='text-white mt-4'>Loading...</p>}
      {error && <p className='text-red-200 mt-4'>{error}</p>}
   {/* Weather Info Show */}
      {weather && (
  <div className='bg-white mt-6 rounded-xl shadow-lg p-6 text-center w-[300px]'>
    <h2 className='text-xl font-bold mb-2'>
      {weather.name}, {weather.sys.country}
    </h2>

    {/*  Weather Icon */}
    <img
      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      alt={weather.weather[0].description}
      className='mx-auto mb-2'
    />

    <p className='text-2xl font-bold'>{weather.main.temp}°C</p>
    <p className='capitalize'>{weather.weather[0].description}</p>
    <p>Humidity: {weather.main.humidity}%</p>
    <p>Wind: {weather.wind.speed} m/s</p>
  </div>
)}

    </div>
  );
};

export default Weather;
