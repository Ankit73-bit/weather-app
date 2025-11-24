import { useEffect, useState } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState();
  const [cityName, setCityName] = useState("Mumbai");

  useEffect(() => {
    console.log(weatherData);
  }, [weatherData]);

  useEffect(() => {
    const fetchWeatherByCity = async () => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_API_KEY
        }`
      );
      const data = await res.json();
      setWeatherData(data);
    };

    fetchWeatherByCity();
  }, [cityName]);

  return <div>Weather</div>;
}

export default Weather;
