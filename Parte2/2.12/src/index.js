import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get(`https://restcountries.com/v2/all`).then(({ data }) => {
      setCountries(data)
      setFilteredCountries(data)
    })
  }, [])

  useEffect(() => {
    filter === ''
      ? setFilteredCountries(countries)
      : setFilteredCountries(
          filteredCountries.filter(function (el) {
            return el.name.toLowerCase().indexOf(filter.toLowerCase()) > -1
          })
        )
  }, [filter])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      Find a country:{' '}
      <input type="text" value={filter} onChange={handleChange} />
      <div>
        {filteredCountries.length >= 10
          ? 'Too many matches,specify another filter'
          : filteredCountries.length < 10 && filteredCountries.length > 1
          ? filteredCountries.map((country) => {
              return <p key={country.name}>{country.name}</p>
            })
          : filteredCountries.map((country) => {
              return (
                <div key={country.name}>
                  <h2>{country.name}</h2>
                  <p>{country.capital}</p>
                  <h3>languages</h3>
                  {country.languages.map((lang) => {
                    return <p key={lang.name}>{lang.name}</p>
                  })}

                  <img src={country.flag} />
                </div>
              )
            })}
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
