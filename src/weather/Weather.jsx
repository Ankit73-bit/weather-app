import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

function Weather() {
  const [weatherData, setWeatherData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [area, setArea] = useState("Mumbai");

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  useEffect(() => {
    const fetchWeatherByCity = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();
      setWeatherData(data);
    };

    fetchWeatherByCity();
  }, [area]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const onSubmitQuery = () => {
    if (!searchQuery) return;
    setArea(searchQuery);
    setSearchQuery("");
  };

  return (
    <>
      <div className="relative w-72 mt-10 left-1/2 -translate-x-1/2">
        <FaSearch
          onClick={onSubmitQuery}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600"
        />
        <input
          type="text"
          placeholder="city, zipcode"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSubmitQuery();
          }}
          className="w-full pl-3 pr-3 py-2 border border-gray-400 rounded-full focus:outline-none focus:border-blue-500"
        />
      </div>
      {weatherData && Number(weatherData.cod) === 404 ? (
        <div className="flex justify-center items-center w-1/2 mx-auto mt-10 text-red-500">
          ✖️ City Not Found, Find another city...
        </div>
      ) : (
        <div className="border flex justify-center items-center w-1/2 mx-auto mt-10 rounded-xl bg-blue-300 hover:bg-blue-400">
          {weatherData && weatherData.name}
        </div>
      )}
    </>
  );
}

export default Weather;
