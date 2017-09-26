import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

// component
import CurrentWeather from './components/current-weather';
import CityStateForm from './components/city-state-form';

// global varialbe for API_KEY
const API_KEY = "b028e8a2020af483";
const REGEX = /\?|!|[0-9]/;

class App extends Component {
  constructor(props) {
    super(props);

    const onPageLoadUrl = window.location.href;

    const urlSplit = onPageLoadUrl.split("/");
    
    this.state = {
      city: urlSplit[3] ? urlSplit[3] : "",
      selectedState: urlSplit[4] ? urlSplit[4].toUpperCase() : "",
      weather: {},
      invalidCity: false,
      url: onPageLoadUrl
    };

  };

  componentDidMount() {
    const { city, selectedState } = this.state;

    if (city !== '' && selectedState !== '') {
      axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${selectedState}/${city}.json`)
        .then(res => {
          const weather = res.data.current_observation ?
            res.data.current_observation :
            { error: "Error. Invalid city name. Please correct and try again." };
          this.setState({ weather: weather });
        });
    }
  }

  onChangeCity(city) {
      this.setState({ city: this.validateCityInput(city)});
  }

  onChangeState(state) {
    this.setState({selectedState: state});
  }

  getWeatherData() {
    const { city, selectedState } = this.state;

    axios.get(`http://api.wunderground.com/api/${API_KEY}/conditions/q/${selectedState}/${city}.json`)
      .then(res => {
        const weather = res.data.current_observation ? 
          res.data.current_observation : 
          { error: "Error. Invalid city name. Please correct and try again." };
        this.setState({weather: weather});
      });
    
  }

  resetWeatherData() {
    this.setState({
      city: "",
      selectedState: "",
      weather: {},
      invalidCity: false
    });
  }

  validateCityInput(city) {
    const invalid = city.match(REGEX);

    if (invalid) this.setState({invalidCity: true});

    return city;
  }
  
  render() {

    const { weather, city, selectedState, invalidCity } = this.state;
    
    return (
      <div className="App">

        <h1> Get the Current Weather </h1>
       
        <CityStateForm
          city={city}
          selectedState={selectedState}
          weather={weather}
          invalidCity={invalidCity}
          onChangeCity={(city) => this.onChangeCity(city)}
          onChangeState={(state) => this.onChangeState(state)}
          getWeatherData={() => this.getWeatherData()}
          resetWeatherData={() => this.resetWeatherData()}
        />

        { !_.isEmpty(weather) &&
          <CurrentWeather
            weather={weather}
          />
        }

      </div>

      
    );
  }
}

export default App;
