import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [countriesToShow, setCountriesToShow] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const getCountries = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setAllCountries(response.data);
      });
    
  }

  useEffect(getCountries, [countriesToShow]);

  const searchCountries = (e) => {
    const searchText = e.target.value.toLowerCase();
    if(searchText) {
      const matchingCountries = allCountries.filter(country => country.name.toLowerCase().includes(searchText));
      setCountriesToShow(matchingCountries);
    } else {
      setCountriesToShow([]);
    }
  }

  const showCountry = (e) => {
    const country = allCountries.filter(country => country.name === e.target.id);
    setCountriesToShow(country);
  }

  return (
    <div>
      <input onChange={searchCountries}/>
      <Countries countries={countriesToShow} showCountry={showCountry}/>
    </div>
  );
}

export default App;
