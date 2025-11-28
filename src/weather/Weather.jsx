import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";

function Weather() {
  const [weatherData, setWeatherData] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [area, setArea] = useState("Mumbai");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  useEffect(() => {
    const fetchWeatherByCity = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=${
            import.meta.env.VITE_API_KEY
          }&units=metric`
        );
        const data = await res.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setWeatherData({ cod: 404 });
      } finally {
        setLoading(false);
      }
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
      {loading ? (
        <div className="flex justify-center items-center w-1/2 mx-auto mt-10 text-blue-600 animate-spin">
          <FiLoader size={30} />
        </div>
      ) : weatherData && Number(weatherData.cod) === 404 ? (
        <div className="flex justify-center items-center w-1/2 mx-auto mt-10 text-red-500">
          ✖️ City Not Found, Find another city...
        </div>
      ) : (
        weatherData && (
          <>
            <div className="border  w-1/2 mx-auto mt-10 rounded-xl bg-blue-300 hover:bg-blue-400 p-3 ring-2 ring-offset-4">
              <div className="flex justify-between items-center">
                <p className="font-bold italic">{weatherData.name} </p>
                <p>
                  <span className="text-blue-700 text-xs">
                    {weatherData.coord.lat}°N
                  </span>{" "}
                  <span className="text-emerald-950 text-xs">
                    {weatherData.coord.lon}°E
                  </span>
                </p>
              </div>
              <div className="mt-5 bg-blue-300">
                {weatherData.weather.map((currWeather) => {
                  return (
                    // https://openweathermap.org/img/wn/50n@2x.png  currWeather.icon
                    <div
                      key={currWeather.id}
                      className="w-full overflow-hidden"
                    >
                      <div className="w-full flex">
                        <span>{currWeather.main}</span>
                        <span>
                          {currWeather.icon}
                          <img
                            className="w-10 bg-white"
                            src={`https://openweathermap.org/img/wn/${currWeather.icon}@2x.png`}
                            alt={currWeather.icon}
                          />
                        </span>
                      </div>
                      <div>{currWeather.description}</div>
                    </div>
                  );
                })}
              </div>
              <div>{weatherData.main.feels_like}°</div>
              <div>{weatherData.main.humidity}°</div>
              <div>{weatherData.main.temp}°</div>
            </div>
          </>
        )
      )}
    </>
  );
}

export default Weather;
