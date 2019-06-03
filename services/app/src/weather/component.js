import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { getCurrentPosition, getWeather } from '../data/api';
import {
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME
} from '../data/constants';
import noWeatherIcon from './assets/img/no-weather-icon.png';

const MainWrapper = styled.div`
  position: relative;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #b4ddb4 0%,
    #83c783 17%,
    #52b152 33%,
    #008a00 67%,
    #005700 83%,
    #002400 100%
  );
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
  width: 40%;
  background: white;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 90%;
  }

  form {
    width: 100%;
  }
`;

const LocationInput = styled.input`
  margin: 1em 0 0.7em 0;
  display: block;
  border: none;
  border-bottom: 1px #a3a3a3 solid;
`;

const SubmitInput = styled.input`
  background: white;
  padding: 1em;
  margin-bottom: 1em;
`;

const LocationInputWithSubmitBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const WeatherSourceWithLocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 70%;
  padding-left: 10px;

  @media (max-width: 425px) {
    align-items: center;
    padding-left: 0;
  }

  fieldset {
    border: none;
    text-align: left;

    label {
      display: block;
    }
  }
`;

const AirTemperatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;

  p {
    margin: 0;
    font-size: 3em;
    font-weight: bold;
    white-space: nowrap;
  }
`;

const WeatherInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #326fab;
  color: white;

  @media (max-width: 425px) {
    flex-direction: column;
    justify-content: space-between;
  }
`;

class WeatherComponent extends PureComponent {
  state = {
    currentAirTemperature: '',
    weatherIconAddress: '',
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
      const {
        airTemperature,
        formattedLocationName,
        weatherIconAddress
      } = currentWeather;

      this.setState({
        selectedLocation: formattedLocationName,
        currentAirTemperature: airTemperature,
        weatherIconAddress
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
      currentAirTemperature,
      weatherIconAddress
    } = this.state;

    return (
      <MainWrapper>
        <WeatherWrapper>
          <form onSubmit={this.handleFormSubmit}>
            <WeatherInfoWrapper>
              <WeatherSourceWithLocationWrapper>
                <h1>{selectedLocation.toUpperCase()}</h1>
                <label htmlFor="weather_source">
                  <fieldset id="weather_source">
                    Weather source:
                    <label htmlFor={WEATHER_SOURCE_APIXU_NAME}>
                      <input
                        type="radio"
                        id={WEATHER_SOURCE_APIXU_NAME}
                        value={WEATHER_SOURCE_APIXU_NAME}
                        onChange={this.handleChangeWeatherSource}
                        checked={weatherSource === WEATHER_SOURCE_APIXU_NAME}
                      />
                      Apixu API
                    </label>
                    <label htmlFor={WEATHER_SOURCE_STORMGLASS_NAME}>
                      <input
                        type="radio"
                        id={WEATHER_SOURCE_STORMGLASS_NAME}
                        value={WEATHER_SOURCE_STORMGLASS_NAME}
                        onChange={this.handleChangeWeatherSource}
                        checked={
                          weatherSource === WEATHER_SOURCE_STORMGLASS_NAME
                        }
                      />
                      Stormglass API
                    </label>
                  </fieldset>
                </label>
              </WeatherSourceWithLocationWrapper>
              {currentAirTemperature.length > 0 && (
                <AirTemperatureWrapper>
                  <img
                    src={
                      weatherIconAddress.length > 0
                        ? `http:${weatherIconAddress}`
                        : noWeatherIcon
                    }
                    alt="weather icon"
                  />
                  <p>{currentAirTemperature} °C</p>
                </AirTemperatureWrapper>
              )}
            </WeatherInfoWrapper>
            <LocationInputWithSubmitBtnWrapper>
              <LocationInput
                id="location"
                name="location"
                placeholder="Input city name"
                value={cityNameInputValue}
                onChange={this.handleInputChange}
                required
              />
              <SubmitInput type="submit" value="Get Weather" />
            </LocationInputWithSubmitBtnWrapper>
          </form>
        </WeatherWrapper>
      </MainWrapper>
    );
  }
}

export default WeatherComponent;
