import { connect } from "react-redux";
import HomeComponent from "../components/Home";
import {
  setSelectedLocation,
  setCurrentWeather,
  setCurrentPosition,
  setLocations,
  clearLocations,
  setWeatherSource
} from "../index";
import {
  WEATHER_APIXU_BASE_URL,
  WEATHER_APIXU_API_KEY,
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME,
  WEATHER_STORMGLASS_API_KEY
} from "../../../data/constants";

export const getLocations = searchPhrase => async dispatch => {
  dispatch(clearLocations());

  const data = await fetch(
    `${WEATHER_APIXU_BASE_URL}/search.json?key=${WEATHER_APIXU_API_KEY}&q=${searchPhrase}`
  )
    .then(response => response.json())
    .then(data => data)
    .catch(e => e);

  dispatch(setLocations(data));
};

export const getCurrentPosition = () => async dispatch => {
  const data = await fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => data)
    .catch(e => e);

  dispatch(getWeather(WEATHER_SOURCE_APIXU_NAME, data.latitude, data.longitude));
  dispatch(setCurrentPosition(data));
  dispatch(setSelectedLocation(data.city));
};

export const getWeather = (
  weatherSource,
  latitude,
  longitude
) => async dispatch => {
  if (weatherSource === WEATHER_SOURCE_APIXU_NAME) {
    const data = await fetch(
      `${WEATHER_APIXU_BASE_URL}/current.json?key=${WEATHER_APIXU_API_KEY}&q=${latitude},${longitude}`
    )
      .then(response => response.json())
      .then(data => data)
      .catch(e => e);

    dispatch(setCurrentWeather(data.current));
  }

  if (weatherSource === WEATHER_SOURCE_STORMGLASS_NAME) {
    const params = "airTemperature";

    const data = await fetch(
      `https://api.stormglass.io/v1/weather/point?lat=${latitude}&lng=${longitude}&params=${params}`,
      {
        headers: {
          Authorization: WEATHER_STORMGLASS_API_KEY
        }
      }
    )
      .then(response => response.json())
      .then(data => data)
      .catch(e => e);

    dispatch(setCurrentWeather(data.hours[0].airTemperature[0]));
  }
};

const mapStateToProps = state => ({
  selectedLocationName: state.home.selectedLocationName,
  locations: state.home.locations,
  selectedWeatherSource: state.home.weatherSource,
  airTemperature:
    Object.keys(state.home.currentWeather).length > 0 &&
    (state.home.currentWeather.temp_c || state.home.currentWeather.value)
});

const mapDispatchToProps = dispatch => ({
  getCurrentPosition: () => dispatch(getCurrentPosition()),
  getLocations: searchPhrase => dispatch(getLocations(searchPhrase)),
  getWeather: (weatherSource, latitude, longitude) =>
    dispatch(getWeather(weatherSource, latitude, longitude)),
  setWeatherSource: weatherSourceName =>
    dispatch(setWeatherSource(weatherSourceName)),
  setSelectedLocationName: locationName =>
    dispatch(setSelectedLocation(locationName))
});

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeComponent);

export default HomeContainer;
