// Jatka kohdasta 2.13
// Kakkososan hommiin kulunut aikaa 12 tuntia

import React, {useState, useEffect} from 'react'
import axios from 'axios'

// Components
const Search = (props) => {
    return (
        <div>
            Find countries: <input value={props.value} onChange={props.onChange} />
        </div>
    )
}

const CountryList = (props) => {
  if (props.countriesToShow.length > 10) {
      return(<div>Too many matches! Please specify your query.</div>)
  } else {
      if (props.countriesToShow.length > 1) {
          return(
              <div>
                  {props.countriesToShow.map(country =>
                    <CountryName key={country.cca3} name={country.name.common} />
                  )}
              </div>
          )
      } else {
          if (props.countriesToShow.length > 0) {
            return(
                <div>
                    <CountryInfo
                        name={props.countriesToShow[0].name.common}
                        officialName={props.countriesToShow[0].name.official}
                        capital={props.countriesToShow[0].capital}
                        languages={props.countriesToShow[0].languages}
                        flags={props.countriesToShow[0].flags}
                    />
                </div>
              )
          }
    return(
        <div></div>
    )
      }
  }
}

const CountryName = (props) => {
  return(
      <div>
          {props.name}
      </div>
  )
}

const CountryInfo = (props) => {
  return (
      <div>
          <h1>{props.name}</h1>
          <p>Official name: {props.officialName} </p>
          <p>Capital: {props.capital} </p>
          <h2>Languages</h2>
          <ul>
             {Object.values(props.languages).map(lan => <li key={lan}>{lan}</li>)}
          </ul>
              <img src={props.flags.png} alt={"Flag of " + props.name}/>
      </div>
  )
}

// App component to render
const App = () => {
    //State hooks
    const [countries, setCountries] = useState([])
    const [countriesToShow, setCountriesToShow] = useState([])
    const [searchQuery, setSearchQuery] = useState("")

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

    return (
    <div>
        <Search value={searchQuery} onChange={handleSearchQuery} />
        <CountryList countriesToShow={countriesToShow}/>
    </div>
  )
}

export default App