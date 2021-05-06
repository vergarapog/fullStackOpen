import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryForm = (props) =>{
  return (
    <div>
      find countries <input value={props.search} onChange={props.onChange}/>
    </div>
  )
}

const CountryList = (props) =>{

  const filteredCountries = props.countries.filter( (country) => {
      if(country.name.toUpperCase().includes(props.search.toUpperCase())){
        console.log(country)
        return country
      }
    })

  
  
  if(props.search === ''){
    return(
      <div></div>
    )
  }

    else if(filteredCountries.length === 1){
      return(
        <div>
          {filteredCountries.map( country => 
          <CountryDetailed key={country.alpha2Code} countryName={country.name}
          capital={country.capital} population={country.population} 
          languages={country.languages} flag={country.flag}
           /> 
          )} 
        </div>
      )
    }

      else if(filteredCountries.length > 10){
        return(
          <div>Too many matches, specify another filter</div>
        )
      }

        else if(filteredCountries.length <= 10){
        return(
          <div>
            {filteredCountries.map( country => 
              <Country key={country.alpha2Code} countryName={country.name} show={props.show} 
              handleShow={props.handleShow} /> 
            )}
            
          </div>
        )
            }

            
}

const CountryDetailed = (props) =>{

  const [weather, setWeather] = useState([])
  const api_key = process.env.REACT_APP_API_KEY

  const params ={
    access_key: api_key,
    query: props.capital
  }

  useEffect ( () => {
    axios.get('http://api.weatherstack.com/current',{params}
    )
    .then(response => {
      setWeather(response.data)
    })
}
,[])

console.log(weather)

const renderWeather = () => {
  if(weather.length === 0) {
    return <div>Loading....</div>
  }

  return(
    <div>
      <Weather temp={weather.current.temperature} 
        img={weather.current.weather_icons} 
        wind={weather.current.wind_speed}/>
    </div>
  )
}

  return(
    <div>
        <h1>{props.countryName}</h1> 
        <p>Capital: {props.capital}</p> 
        <p>Population: {props.population}</p> 
        <h3>Languages</h3>
        <ul>
          {props.languages.map(language => 
            <li key={props.key}>{language.name}</li>)}
        </ul>
        <img src={props.flag} style={{width: '150px'} }></img>
        <h3>Weather in {props.countryName}</h3>
        {renderWeather()}
    </div>
  )
}

const Country = (props) =>{
  
  return(
    <p>
        {props.countryName} 
        <button onClick={props.handleShow} value={props.countryName}>
          show</button>
    </p>
  )
}

const Weather = ({temp, img, wind}) =>{
  return(
    <div>
      <p>Temperature: {temp}</p>
      <img src={img}></img>
      <p>Wind: {wind}</p>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  

  useEffect( () => {
      axios.get('https://restcountries.eu/rest/v2/all')
           .then(response => {
             setCountries(response.data)
           })
  } 
  , [])

  

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  const handleShowButton = e => (
    setSearch(e.target.value)
  )

  


  return (
    <div>
      <CountryForm search={search} onChange={handleSearchChange}/>
      <CountryList countries={countries} search={search}  handleShow={handleShowButton}
     />

    </div>
  )
}

export default App;
