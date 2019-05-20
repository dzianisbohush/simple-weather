import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Select, Radio } from "antd";
import debounce from "lodash/debounce";
import {
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME
} from "../../../data/constants";

const Option = Select.Option;
const RadioGroup = Radio.Group;

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.getLocationsWithDebounce = debounce(this.props.getLocations, 800);
  }

  componentDidMount() {
    const { getCurrentPosition } = this.props;

    getCurrentPosition();
  }

  handleSelect = value => {
    const {
      locations,
      getWeather,
      selectedWeatherSource,
      setSelectedLocationName
    } = this.props;
    const selectedLocation = locations.find(
      location => location.id.toString() === value
    );
    const { lat, lon, name } = selectedLocation;

    getWeather(selectedWeatherSource, lat, lon);
    setSelectedLocationName(name);
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
      airTemperature
    } = this.props;

    return (
      <div>
        <h1>{selectedLocationName}</h1>
        <div>
          <span>Weather source: </span>
          <RadioGroup
            onChange={this.handleChangeWeatherSource}
            value={selectedWeatherSource}
          >
            <Radio value={WEATHER_SOURCE_APIXU_NAME}>Apixu API</Radio>
            <Radio value={WEATHER_SOURCE_STORMGLASS_NAME}>Stormglass API</Radio>
          </RadioGroup>
        </div>
        <div>
          <span>Select another location:</span>
          <Select
            showSearch
            placeholder="Input city"
            filterOption={false}
            onSearch={this.getLocationsWithDebounce}
            onSelect={this.handleSelect}
            style={{ width: "100%" }}
          >
            {locations &&
            Object.keys(locations).length > 0 &&
            locations.map(location => (
              <Option key={location.id}>{location.name}</Option>
            ))}
          </Select>
        </div>
        {airTemperature && <p>Air temperature: {airTemperature} °C</p>}
      </div>
    );
  }
}

Home.defaultProps = {
  airTemperature: ""
};

Home.propsTypes = {
  getCurrentPosition: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  setSelectedLocationName: PropTypes.func.isRequired,
  selectedLocationName: PropTypes.string.isRequired,
  setWeatherSource: PropTypes.func.isRequired,
  selectedWeatherSource: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  airTemperature: PropTypes.string
};

export default Home;
