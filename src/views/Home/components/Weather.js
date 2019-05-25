import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { Radio, Select, Spin } from "antd";
import {
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME
} from "../../../data/constants";

import "../assets/styles/weather.css";

const Option = Select.Option;
const RadioGroup = Radio.Group;

class Weather extends PureComponent {
  constructor(props) {
    super(props);
    this.getLocationsWithDebounce = debounce(this.props.getLocations, 800);
  }

  state = {
    selectedLocationId: ""
  };

  handleSelect = value => {
    const { selectedLocationId } = this.state;
    const { locations, getWeather, setSelectedLocationName } = this.props;
    const selectedLocation = locations.find(
      location => location.id.toString() === value
    );
    const { lat, lon, name } = selectedLocation;

    if (selectedLocationId === value) {
      return;
    }

    getWeather(lat, lon);
    setSelectedLocationName(name);
    this.setState({ selectedLocationId: value });
  };

  handleChangeWeatherSource = e => {
    const { setWeatherSource } = this.props;

    setWeatherSource(e.target.value);
  };

  render() {
    const {
      selectedLocationName,
      locations,
      selectedWeatherSource,
      airTemperature,
      isLoadingAirTemperature,
      isLoadingLocations
    } = this.props;

    return (
      <div className="weather-wrapper">
        <h1>{selectedLocationName}</h1>
        <div className="weather-source-wrapper">
          <p>Weather source: </p>
          <RadioGroup
            onChange={this.handleChangeWeatherSource}
            value={selectedWeatherSource}
          >
            <Radio value={WEATHER_SOURCE_APIXU_NAME}>Apixu API</Radio>
            <Radio value={WEATHER_SOURCE_STORMGLASS_NAME}>Stormglass API</Radio>
          </RadioGroup>
        </div>
        <div className="select-location-wrapper">
          <p>Select another location:</p>
          <Select
            showSearch
            placeholder="Input city"
            filterOption={false}
            onSearch={this.getLocationsWithDebounce}
            notFoundContent={isLoadingLocations ? <Spin size="small" /> : null}
            onSelect={this.handleSelect}
            style={{ width: "90%" }}
          >
            {locations && (Object.keys(locations).length > 0) &&
              locations.map(location => (<Option key={location.id}>{location.name}</Option>)
            )}
          </Select>
        </div>
        {isLoadingAirTemperature || !airTemperature ? (
            <Spin tip="loding air temperature..." />
          ) : (
            <div className="temperature-wrapper">
              <p>Air temperature:</p>
              <p>{airTemperature} °C</p>
            </div>
        )}
      </div>
    );
  }
}

Weather.propTypes = {
  getWeather: PropTypes.func.isRequired,
  setSelectedLocationName: PropTypes.func.isRequired,
  selectedLocationName: PropTypes.string.isRequired,
  setWeatherSource: PropTypes.func.isRequired,
  selectedWeatherSource: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  isLoadingAirTemperature: PropTypes.bool.isRequired,
  isLoadingLocations: PropTypes.bool.isRequired,
  airTemperature: PropTypes.string.isRequired,
  getLocations: PropTypes.func.isRequired
};

export default Weather;