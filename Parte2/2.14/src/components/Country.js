import React, { useState, useEffect } from 'react'
import axios from 'axios'
require('dotenv').config()

export default function Country({ name, capital, languages, flag }) {
  const apiKey = process.env.REACT_APP_API_KEY

  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
      )
      .then(({ data }) => {
        setWeather(data.current)
        console.log(data.current)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div key={name}>
      <h2>{name}</h2>
      <p>{capital}</p>
      <h3>languages</h3>
      {languages.map((lang) => {
        return <p key={lang.name}>{lang.name}</p>
      })}
      <img src={flag} />
      <div>
        <p>temperature: {weather.temperature}º</p>
        <p>
          Wind direction: {weather.wind_dir} - Wind speed: {weather.wind_speed}{' '}
        </p>
      </div>
    </div>
  )
}
