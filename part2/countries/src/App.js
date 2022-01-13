/**
 * Full Stack open 2021 - Countries
 * Author: Eero Mäkipää
 * 
 * This application displays information about countries. User types the
 * query in input field. When the sum of matching countries is 10 or less,
 * the application shows list of countries matching the search. User can
 * choose country to show more information either by clicking the button or
 * typing the name so there is only one country that matches the query.
 */

import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryList from './components/CountryList'

const API_KEY = process.env.REACT_APP_API_KEY

// App component to render
const App = () => {
  //State hooks
  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [weatherToShow, setWeatherToShow] = useState([])

  // Effect hook to get data from restcountrties api
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
          setCountries(response.data)
      })
  },[])

  // Event handlers
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
    setCountriesToShow(
      countries.filter( country => 
        country.name.common.toLocaleLowerCase()
        .includes(event.target.value.toLocaleLowerCase())
      )
    )
  }
  
  const handleShowCountry = (event) => {
    const countryToShow = countries.filter( country => country.cca3 === event.target.id )
    setCountriesToShow(countryToShow)
    const params = {
      access_key: API_KEY,
      query: countryToShow[0].capital[0]
    }
    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        console.log(response)
        const apiResponse = response.data;
        setWeatherToShow( {
          location: apiResponse.location.name,
          temperature: apiResponse.current.temperature,
          description: apiResponse.current.weather_descriptions
        })
      }).catch(error => {
        console.log(error);
      });
  }

  // App return statement
  return (
    <div>
      <Search value={searchQuery} onChange={handleSearchQuery} />
      <CountryList
        countriesToShow={countriesToShow}
        weather={weatherToShow}
        handleShowCountry={handleShowCountry}
      />
    </div>
  )
}

export default App
