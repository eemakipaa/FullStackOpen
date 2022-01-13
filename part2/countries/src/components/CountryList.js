import React from "react"

/**
 * Component shows a list of ten countries or less according
 * to search query. If only one country matches query, component
 * shows info of that country 
 */
const CountryList = ({countriesToShow, weather, handleShowCountry}) => {
  if (countriesToShow.length > 10) {
    return(<div>Too many matches! Please specify your query.</div>)
  }
  else {
    if (countriesToShow.length > 1) {
      return(
        <div>
          {countriesToShow.map(country =>
            <CountryName
              key={country.cca3}
              id={country.cca3}
              name={country.name.common}
              handleShowCountry={handleShowCountry}
            /> 
          )}
        </div>
      )
    }
    else {
      if (countriesToShow.length > 0) {
        return(
          <div>
            <CountryInfo
              name={countriesToShow[0].name.common}
              officialName={countriesToShow[0].name.official}
              capital={countriesToShow[0].capital}
              languages={countriesToShow[0].languages}
              flags={countriesToShow[0].flags}
              weather={weather}
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

// Button onClick event shows info of the country
const CountryName = ({name, id, handleShowCountry}) => {
  return(
    <div>
      {name} <button id={id} onClick={handleShowCountry}>show</button>
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
      <h2>
        Current Weather in {props.weather.location} is {props.weather.description} and
        the temperature is {props.weather.temperature}°C
      </h2>
    </div>
  )
}

  export default CountryList