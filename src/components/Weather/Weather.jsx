import { useEffect, useState } from "react";
import axios from "axios";
import "./Weather.scss";
const localStorageKey = "cityName";
export default function App() {
  const [input, setInput] = useState("");
  const [location, setLocation] = useState(() => {
    return JSON.parse(localStorage.getItem(localStorageKey)) || "Kathmandu";
  });
  const [apiData, setApiData] = useState();

  function handleChange(event) {
    setInput(event.target.value);
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) { 
      setLocation(input);
    }
  }
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    const currentWeather = {
      key: "f1c3723a3521e1fd9d452efeed593642",
      baseUrl: "https://api.openweathermap.org/data/2.5/weather",
      city: location
    };
    axios
      .get(
        `${currentWeather.baseUrl}?q=${currentWeather.city}&appid=${currentWeather.key}&units=metric`
      )
      .then((res) => setApiData(res.data))
      .catch((err) => console.log(err));
  }, [location]);

  const sunrise = apiData?.sys?.sunrise;
  const sunriseDate = new Date(sunrise * 1000);
  const sunriseHours = sunriseDate.getHours();
  const sunriseMunites = sunriseDate.getMinutes();

  const sunset = apiData?.sys?.sunset;
  const sunsetDate = new Date(sunset * 1000);
  const sunsetHours = sunsetDate.getHours();
  const sunsetMinutes = sunsetDate.getMinutes();

  return (
    <div className="weather-wrapper">
      <div className="flex">
        <div>
          <input
            type="text"
            value={input}
            placeholder={location}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="temp-info">
          <p className="current-temp">{Math.floor(apiData?.main.temp)}&deg;C</p>
        </div>
      </div>
      <div className="flex">
        <div className="misc-info">
          <p>Wind: {apiData?.wind.speed} k/h</p>
          <p>Humidity : {apiData?.main.humidity}</p>
          <p>Pressure : {apiData?.main.pressure}</p>
          <p>
            Sunrise : {sunriseHours} : {sunriseMunites}
          </p>
          <p>
            Sunset : {sunsetHours} : {sunsetMinutes}
          </p>
        </div>
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${apiData?.weather[0].icon}.png`}
            alt=""
          />
          <p>{apiData?.weather[0].main}</p>
        </div>
        <div className="misc-info">
            <p>Max : {Math.floor(apiData?.main.temp_max)}&deg;C</p>
            <p>Min : {Math.floor(apiData?.main.temp_min)}&deg;C</p>
        </div>
      </div>
    </div>
  );
}
