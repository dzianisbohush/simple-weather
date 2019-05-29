import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { getCurrentPosition, getWeather } from '../data/api';
import {
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME
} from '../data/constants';

const MainWrapper = styled.div`
  position: relative;
  height: 100vh;
`;

const WeatherWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const LocationInput = styled.input`
  margin: 1em 0 0.7em 0;
  display: block;
  border: none;
  border-bottom: 1px #a3a3a3 solid;
`;

const SubmitInput = styled.input`
  border-radius: 5px;
`;

const AirTemperatureTitle = styled.p`
  font-size: 1em;
  margin-bottom: 0;
`;

const AirTemperatureValue = styled.p`
  font-size: 1.5em;
  margin: 0;
`;

const WeatherSourceFieldset = styled.fieldset`
  border: none;
`;

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
      <MainWrapper>
        <WeatherWrapper>
          <h1>{selectedLocation.toUpperCase()}</h1>
          <form onSubmit={this.handleFormSubmit}>
            <label htmlFor="weather_source">Weather source:</label>
            <WeatherSourceFieldset id="weather_source">
              <div>
                <input
                  type="radio"
                  id={WEATHER_SOURCE_APIXU_NAME}
                  value={WEATHER_SOURCE_APIXU_NAME}
                  onChange={this.handleChangeWeatherSource}
                  checked={weatherSource === WEATHER_SOURCE_APIXU_NAME}
                />
                <label htmlFor={WEATHER_SOURCE_APIXU_NAME}>Apixu API</label>
              </div>
              <div>
                <input
                  type="radio"
                  id={WEATHER_SOURCE_STORMGLASS_NAME}
                  value={WEATHER_SOURCE_STORMGLASS_NAME}
                  onChange={this.handleChangeWeatherSource}
                  checked={weatherSource === WEATHER_SOURCE_STORMGLASS_NAME}
                />
                <label htmlFor={WEATHER_SOURCE_STORMGLASS_NAME}>
                  Stormglass API
                </label>
              </div>
            </WeatherSourceFieldset>
            <LocationInput
              id="location"
              name="location"
              placeholder="Input city name"
              value={cityNameInputValue}
              onChange={this.handleInputChange}
              required
            />
            <SubmitInput type="submit" value="Get Weather" />
          </form>
          {currentAirTemperature.length > 0 && (
            <React.Fragment>
              <AirTemperatureTitle>Air temperature:</AirTemperatureTitle>
              <AirTemperatureValue>
                {currentAirTemperature} °C
              </AirTemperatureValue>
            </React.Fragment>
          )}
        </WeatherWrapper>
      </MainWrapper>
    );
  }
}

export default WeatherComponent;