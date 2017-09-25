import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

// util for state drop down
import STATES from '../utils/states';

class CityStateForm extends Component {

  static propTypes = {
    city: PropTypes.string,
    weather: PropTypes.object,
    selectedState: PropTypes.string,
    onChangeCity: PropTypes.func,
    onChangeState: PropTypes.func,
    getWeatherData: PropTypes.func,
    resetWeatherData: PropTypes.func
  };

  render() {
    const { weather, city, selectedState, onChangeCity, onChangeState, getWeatherData, resetWeatherData } = this.props;

    return (

      <form className="form-horizontal center-form">
        <div className={`form-group ${weather.error ? "has-error" : ""}`}>
          <label for="inputCity" className="col-sm-2 control-label">City</label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control input text-center"
              id="input-city"
              placeholder="ex. Detroit"
              value={city}
              onChange={(e) => onChangeCity(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <label for="selectState" className="col-sm-2 control-label">State</label>
          <div className="col-sm-10">
            <Select
              name="foo"
              id="selectedState"
              placeholder="ex. MI"
              value={selectedState}
              options={STATES}
              clearable={false}
              onChange={(v) => onChangeState(v.value)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              type="button"
              className="btn btn-primary btn-margin"
              onClick={() => getWeatherData()}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger btn-margin"
              onClick={() => resetWeatherData()}
            >
              Reset
            </button>
          </div>
        </div>
      </form>

    );
  }
}

export default CityStateForm;
