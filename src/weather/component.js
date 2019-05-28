import React, { PureComponent } from 'react';
import { getCurrentPosition, getWeather } from '../data/api';
import {
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME
} from '../data/constants';

class WeatherComponent extends PureComponent {
  state = {
    currentAirTemperature: '',
    selectedLocation: '',
    cityNameInputValue: '',
    weatherSource: WEATHER_SOURCE_APIXU_NAME
  };

  async componentDidMount() {
    const { weatherSource } = this.state;
    const selectedLocation = await getCurrentPosition();

    this.handleGetWeather(selectedLocation, weatherSource);
  }

  handleGetWeather = async (cityName, weatherSource) => {
    const currentWeather = await getWeather(cityName, weatherSource);

    if (currentWeather) {
      const { airTemperature, formattedLocationName } = currentWeather;

      this.setState({
        selectedLocation: formattedLocationName,
        currentAirTemperature: airTemperature
      });

      return;
    }
    alert('No matching location found');
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { cityNameInputValue, weatherSource } = this.state;

    this.handleGetWeather(cityNameInputValue, weatherSource);
  };

  handleInputChange = e => {
    const { value } = e.target;

    this.setState({ cityNameInputValue: value });
  };

  handleChangeWeatherSource = e => {
    const { value } = e.target;

    this.setState({ weatherSource: value });
  };

  render() {
    const {
      cityNameInputValue,
      weatherSource,
      selectedLocation,
      currentAirTemperature
    } = this.state;

    return (
      <div className="weather-wrapper">
        <h1>{selectedLocation.toUpperCase()}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <p>Weather source: </p>
          <label htmlFor={WEATHER_SOURCE_APIXU_NAME}>Apixu API</label>
          <input
            type="radio"
            id={WEATHER_SOURCE_APIXU_NAME}
            value={WEATHER_SOURCE_APIXU_NAME}
            onChange={this.handleChangeWeatherSource}
            checked={weatherSource === WEATHER_SOURCE_APIXU_NAME}
          />
          <label htmlFor={WEATHER_SOURCE_STORMGLASS_NAME}>Stormglass API</label>
          <input
            type="radio"
            id={WEATHER_SOURCE_STORMGLASS_NAME}
            value={WEATHER_SOURCE_STORMGLASS_NAME}
            onChange={this.handleChangeWeatherSource}
            checked={weatherSource === WEATHER_SOURCE_STORMGLASS_NAME}
          />
          <input
            id="location"
            name="location"
            placeholder="Input city name"
            value={cityNameInputValue}
            onChange={this.handleInputChange}
            required
          />
          <input type="submit" value="Get Weather" />
        </form>
        {currentAirTemperature.length > 0 && <p>{currentAirTemperature} °C</p>}
      </div>
    );
  }
}

export default WeatherComponent;