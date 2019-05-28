import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Weather from './Weather';

import '../assets/styles/home.css';

class Home extends PureComponent {
  componentDidMount() {
    const { getCurrentPosition } = this.props;
    getCurrentPosition();
  }

  render() {
    const {
      selectedLocationName,
      locations,
      selectedWeatherSource,
      airTemperature,
      getWeather,
      setSelectedLocationName,
      isLoadingAirTemperature,
      setWeatherSource,
      getLocations,
      isLoadingLocations
    } = this.props;

    return (
      <div className="home-wrapper">
        <Weather
          locations={locations}
          getWeather={getWeather}
          getLocations={getLocations}
          airTemperature={airTemperature}
          setWeatherSource={setWeatherSource}
          isLoadingLocations={isLoadingLocations}
          selectedLocationName={selectedLocationName}
          selectedWeatherSource={selectedWeatherSource}
          setSelectedLocationName={setSelectedLocationName}
          isLoadingAirTemperature={isLoadingAirTemperature}
        />
      </div>
    );
  }
}

Home.defaultProps = {
  airTemperature: ''
};

Home.propTypes = {
  getCurrentPosition: PropTypes.func.isRequired,
  getLocations: PropTypes.func.isRequired,
  getWeather: PropTypes.func.isRequired,
  setSelectedLocationName: PropTypes.func.isRequired,
  selectedLocationName: PropTypes.string.isRequired,
  setWeatherSource: PropTypes.func.isRequired,
  selectedWeatherSource: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired,
  isLoadingAirTemperature: PropTypes.bool.isRequired,
  isLoadingLocations: PropTypes.bool.isRequired,
  airTemperature: PropTypes.string
};

export default Home;
