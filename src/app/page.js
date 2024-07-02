"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./page.css";
import { Button, Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

const Home = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState("/images/snow.jpg"); 
  const [error, setError] = useState(false); 

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(false); 
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setWeather(response.data);
      updateBackgroundImage(response.data.weather[0].main);
      setLoading(false);
      console.log(response.data);
    } catch {
      console.error("Error fetching weather data:");
      setError(true); 
      setLoading(false);
    }
  };

  const updateBackgroundImage = (weatherCondition) => {
    let newImage;
    switch (weatherCondition.toLowerCase()) {
      case "clear":
        newImage = "/images/clear-sky.jpg";
        break;
      case "clouds":
        newImage = "/images/cloudy.jpg";
        break;
      case "rain":
      case "drizzle":
        newImage = "/images/rain2.jpg";
        break;
      case "snow":
        newImage = "/images/snow.jpg";
        break;
      case "thunderstorm":
        newImage = "/images/thunderstorm.jpg";
        break;
      case "mist":
      case "fog":
        newImage = "/images/mist.jpg";
        break;
      default:
        newImage = "/images/clear-sky.jpg";
    }
    setBackgroundImage(newImage);
  };

  useEffect(() => {
    document.body.style.transition = "background-image 0.5s ease-in-out";
    document.body.style.backgroundImage = `url(${backgroundImage})`;
  }, [backgroundImage]);

  const clearInput = () => {
    setCity("");
  };

  return (
    <div className="flex h-[100vh] justify-center items-center flex-col">
      <p className="text-[30px] font-[600] mt-[-100px] gradient-text">
        Check <span className="text-[30px] gradient-text1">weather</span> in your city
      </p>
      <div className="flex justify-center items-center mr-5 ml-5 mt-[-50px]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeather();
          }}
        >
          <div className="w-[640px] h-[440px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr text-white shadow-lg flex-col backdrop-blur-[6px] bg-white bg-opacity-20 sm:w-[390px] sn:w-auto mt-[50px]">
            <div className="mt-[-180px] sm:mt-[-200px]">
              <Input
                className="mb-5 w-[280px] sm:w-[250px]"
                label="Search"
                isClearable
                required
                radius="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60 ",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "shadow-xl",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                  ],
                }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Type to search city..."
                startContent={
                  <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
              <div className="flex justify-center items-center gap-5">
                <Button
                  type="submit"
                  radius="full"
                  className="bg-gradient-to-tr gray-100 text-black shadow-lg block hover:bg-white"
                >
                  Submit
                </Button>
                <Button
                  onClick={clearInput}
                  radius="full"
                  className="bg-gradient-to-tr gray-100 text-black shadow-lg block  hover:bg-white"
                >
                  Clear
                </Button>
              </div>
            </div>
            {loading ? (
             <div className="mt-[15px] flex-col justify-center sm:mt-[25px]">
             <div className="loader"></div>
             </div>
            ) : error ? (
              <p className="mt-10 text-[20px]">⚠️ No weather data available</p>
            ) : weather ? (
              <div className="mt-5 mb-[-130px] flex-row text-gray-900 justify-evenly mr-[80px] sm:mb-[-230px] sm:mr-[-15px]">
                <p className="text-[25px]">
                  Weather in {weather.name}, {weather.sys.country}
                </p>
                <p className="text-[25px]">{weather.weather[0].description}</p>
                <p className="text-[60px]">{weather.main.temp.toFixed(0)}&#176;C</p>
                <div className="grid grid-cols-2 gap-2 w-max text-[17px]">
                  <p className="text-[20px]">Humidity: {weather.main.humidity} g/m3</p>
                  <p className="sm:ml-4">Feels like: {weather.main.feels_like.toFixed(0)}&#176;C</p>
                  <p className="mr-2">Max Temp: {weather.main.temp_max.toFixed(0)}&#176;C</p>
                  <p>Min Temp: {weather.main.temp_min.toFixed(0)}&#176;C</p>
                </div>
              </div>
            ) : (
              <p className="mt-10 text-3xl text-gray-100">Enter any city here</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
