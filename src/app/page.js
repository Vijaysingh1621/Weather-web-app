"use client"
import React, { useState } from 'react'
import axios from 'axios';
import "./page.css"
import {Button, Input} from "@nextui-org/react";
import {SearchIcon} from "./SearchIcon";


const Home = () => {

  const[weather,setWeather]=useState(null);
  const[city,setCity]=useState("");


  const fetchWeather= async()=>{
    try{
      const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=60e5fbc22848d3d14bf0c0123f9380c7`)
      setWeather(response.data)
      
      console.log(response.data)
    }catch{
      console.error("Error fetching weather data:",error)
    }
  }

  const clearInput=()=>{
    setCity("")
  }
  return (
    <>
    {/*
    <div className='container'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        fetchWeather();
      }}>
        <input type='text' placeholder='enter city' value={city} onChange={(e)=>setCity(e.target.value)}></input>
        <button type='submit'>search</button>


      </form>
      <p></p>
    </div> */}


<div className='flex h-[100vh] justify-center items-center '>
    <div className='flex justify-center items-center mr-5 ml-5 mt-[-100px]'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        fetchWeather();
      }}>
      
        <div  className="w-[640px] h-[440px] px-8 rounded-2xl flex justify-center items-center  bg-gradient-to-tr  text-white shadow-lg flex-col backdrop-blur-[6px] bg-white bg-opacity-20 sm:w-[390px]  sn:w-auto mt-[50px] ">
        <div className='mt-[-250px] sm:mt-[-250px]'>
        <Input
        className='mb-5 w-[280px] sm:w-[250px]'
          label="Search"
          isClearable
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
          onChange={(e)=>setCity(e.target.value)}

          placeholder="Type to search city..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <div className='flex block justify-center items-center gap-5'>
        <Button  type='Submit' radius="full" className="bg-gradient-to-tr  gray-100  text-black shadow-lg block hover:border-[1px] hover:border-black" >
              Submit
            </Button>
            <Button  onClick={clearInput} radius="full" className="bg-gradient-to-tr  gray-100  text-black shadow-lg block hover:border-[1px] hover:border-black" >
              clear
            </Button>
          </div>
          
            
           
        </div>
          {weather?(
        <div className=' mt-5 mb-[-130px] flex-row justify-evenly mr-[80px] sm:mb-[-130px]'>
          <p className='text-[20px]'>weather in {weather.name},{weather.sys.country}</p>
          <p>Description: {weather.weather[0].description}</p>
          <p className='text-[60px]'>{weather.main.temp.toFixed(0)}&#176;C</p>
        </div>):(<p className='mt-5 '>⚠️ no weather data available</p>)}
        
            
        </div>
        
          
</form>
</div>
</div>
</>
  )
}

export default Home
