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
      const response=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.Weather_api_key})}`)
      
      console.log(response)
    }catch{
      console.error("Error fetching weather data:",error)
    }
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



    <div className='container'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        fetchWeather();
      }}>
      
        <div  className="w-[440] h-[440px] px-8 rounded-2xl flex justify-center items-center bg-gradient-to-tr  text-white shadow-lg flex-col">
        <div className='box'>
        <Input
        className='mb-5 '
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
        <Button  type='Submit' radius="full" className="bg-gradient-to-tr from-green-500 to-blue-500 text-white shadow-lg block " >
              Submit
            </Button>
            
        </div>
        </div>
</form>
</div>
</>
  )
}

export default Home
