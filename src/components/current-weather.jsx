import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CurrentWeather extends Component {

  static propTypes = {
    weather: PropTypes.object,
  };

  render() {
    const { weather } = this.props;
    
    return (
      <div> 

        { weather && !weather.error ? 
          <div>
            <p> The current weather in {weather.display_location.full} is {weather.temp_f}&#8457; and {weather.weather}. </p>
          </div>
          :
          <div>
            {weather.error}
          </div>
        }

      </div>
    );
  }
}

export default CurrentWeather;
