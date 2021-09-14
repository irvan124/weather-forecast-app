import axios from "axios";
import { useState } from "react";

const api = {
  key: "8a91744ff13f7b8435ee523d08b0bdf1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          setQuery("");
          setWeather(res);
          console.log(res);
        })

        .catch((err) => {
          setQuery("");
          alert("Sorry, the location is not founded");
        });
    }
  };

  const getDate = (data) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[data.getDay()];
    let date = data.getDate();
    let month = months[data.getMonth()];
    let year = data.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        weather.data
          ? weather.data.weather[0].main === "Rain"
            ? "app rain"
            : weather.data.weather[0].main === "Clear"
            ? "app clear"
            : weather.data.weather[0].main === "Clouds"
            ? "app clouds"
            : "app"
          : "app"
      }
    >
      <main>
        <h1>Weather Forecast App</h1>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {weather.data ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.data.name}, {weather.data.sys.country}
              </div>
              <div className="date">{getDate(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{weather.data.main.temp}°c</div>
              <br />
              <img
                className="image"
                src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                alt="Weather Ilustration"
              />
              <div className="weather">
                {weather.data.weather[0].description}
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
