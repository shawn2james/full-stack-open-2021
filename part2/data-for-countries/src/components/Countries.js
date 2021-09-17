import { useState, useEffect } from 'react';
import axios from 'axios';

const CountryView = ({ country }) => {
  const accessKey = process.env.REACT_APP_API_KEY;
  const [currentWeather, setCurrentWeather] = useState({});

  const flagStyle = {
    width: "200px", 
    marginTop: "20px"
  }

  useEffect(() => {
    let isMounted = true;
    axios
    .get(`http://api.weatherstack.com/current?access_key=${accessKey}&query=${country.capital}`)
    .then(response => {
      console.log(response.data.current)
      setCurrentWeather(response.data.current);
    })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>

      <h2>languages</h2>
      <ul>
        { country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>

      <img src={country.flag} alt={country.name} style={flagStyle} />

      <h2>Weather in {country.capital}</h2>
      <p>temperature: {currentWeather.temperature} Celsius</p>
      <img src={currentWeather.weather_icons} alt="" />
      <p>wind: {currentWeather.wind_speed} mph direct {currentWeather.wind_dir}</p>
    </div>
  );
}

const Countries = ({ countries, showCountry }) => {
  if(countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if(countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <div key={country.name}>
            <span>{country.name}</span>
            <button id={country.name} onClick={showCountry}>show</button>
          </div>
        ))}
      </div>
    );
  } else if(countries.length === 1) {
    return <CountryView country={countries[0]} />
  } else { 
    return <></>;
  }
} 

export default Countries;