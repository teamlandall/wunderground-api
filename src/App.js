import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';

// component
import CurrentWeather from './components/current-weather';
import CityStateForm from './components/city-state-form';

// global varialbe for API_KEY
const API_KEY = "b028e8a2020af483";

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      city: "",
      selectedState: "",
      weather: {}
    };

  };

  onChangeCity(city) {
    this.setState({city: city});
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
        this.setState({ weather });
      });
  }

  resetWeatherData() {
    this.setState({
      city: "",
      selectedState: "",
      weather: {}
    });
  }
  
  render() {

    const { weather, city, selectedState } = this.state;
    
    return (
      <div className="App">

        <h1> Get the Current Weather </h1>
       
        <CityStateForm
          city={city}
          selectedState={selectedState}
          weather={weather}
          onChangeCity={(city) => this.onChangeCity(city)}
          onChangeState={(state) => this.onChangeState(state)}
          getWeatherData={() => this.getWeatherData()}
          resetWeatherData={() => this.resetWeatherData()}
        />

        {!_.isEmpty(weather) &&
          <CurrentWeather
            weather={weather}
          />
        }

      </div>

      
    );
  }
}

export default App;
