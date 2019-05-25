import { connect } from "react-redux";
import HomeComponent from "../components";
import {
  setSelectedLocation,
  getCurrentWeatherStart,
  getCurrentWeatherSuccess,
  getCurrentWeatherFailed,
  setCurrentPosition,
  getLocationsStart,
  getLocationsFailure,
  getLocationsSuccess,
  pushLocationsToCache,
  setUpdatedLocationsCache,
  setWeatherSource,
  pushCurrentWeatherToCache,
  setUpdatedCurrentWeatherCache
} from "../index";
import {
  WEATHER_APIXU_BASE_URL,
  WEATHER_APIXU_API_KEY,
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME,
  WEATHER_STORMGLASS_API_KEY
} from "../../../data/constants";

const handleRequestErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
};

export const getLocations = searchPhrase => (dispatch, getState) => {
  if (searchPhrase.length < 3) {
    return;
  }

  dispatch(getLocationsStart());

  const {
    home: {
      locations: { cachedRequests }
    }
  } = getState();

  const cashedLocationsIndex = cachedRequests.findIndex(item => item.searchPhrase === searchPhrase);

  if (cashedLocationsIndex >= 0) {
    const hoursDifference = Math.abs(cachedRequests[cashedLocationsIndex].createdAt - Date.now()) / (60 * 60 * 1000);

    if (hoursDifference <= 2) {
      dispatch(getLocationsSuccess(cachedRequests[cashedLocationsIndex].locations));

      return;
    }

    const updatedCachedRequests = cachedRequests.splice(cashedLocationsIndex);
    dispatch(setUpdatedLocationsCache(updatedCachedRequests));
  }

  fetch(`${WEATHER_APIXU_BASE_URL}/search.json?key=${WEATHER_APIXU_API_KEY}&q=${searchPhrase}`)
    .then(handleRequestErrors)
    .then(response => response.json())
    .then(data => {
      dispatch(getLocationsSuccess(data));

      return data;
    })
    .then(locations => dispatch(pushLocationsToCache({ searchPhrase, createdAt: Date.now(), locations })))
    .catch(error => dispatch(getLocationsFailure(error.message)));
};

export const getCurrentPosition = () => async dispatch => {
  const data = await fetch("https://ipapi.co/json/")
    .then(response => response.json())
    .then(data => data)
    .catch(e => e);

  dispatch(getWeather(data.latitude, data.longitude));
  dispatch(setCurrentPosition(data));
  dispatch(setSelectedLocation(data.city));
};

export const getWeather = (latitude, longitude) => (dispatch, getState) => {
  dispatch(getCurrentWeatherStart());
  const {
    home: {
      weather: { weatherSource, cachedRequests }
    }
  } = getState();

  const cachedWeatherIndex = cachedRequests.findIndex(
    item =>
      item.weatherSource === weatherSource &&
      item.longitude === longitude &&
      item.latitude === latitude
  );

  if (cachedWeatherIndex >= 0) {
    const hoursDifference = Math.abs(cachedRequests[cachedWeatherIndex].createdAt - Date.now()) / (60 * 60 * 1000);

    if (hoursDifference <= 2) {
      dispatch(getCurrentWeatherSuccess(cachedRequests[cachedWeatherIndex].currentWeather));

      return;
    }

    const updatedCachedRequests = cachedRequests.splice(cachedWeatherIndex);
    dispatch(setUpdatedCurrentWeatherCache(updatedCachedRequests));
  }

  if (weatherSource === WEATHER_SOURCE_APIXU_NAME) {
    fetch(`${WEATHER_APIXU_BASE_URL}/current.json?key=${WEATHER_APIXU_API_KEY}&q=${latitude},${longitude}`)
      .then(handleRequestErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(getCurrentWeatherSuccess(data.current));

        return data.current;
      })
      .then(currentWeather =>
        dispatch(
          pushCurrentWeatherToCache({
            latitude,
            longitude,
            weatherSource,
            currentWeather,
            createdAt: Date.now()
          })
        )
      )
      .catch(error => dispatch(getCurrentWeatherFailed(error.message)));
  }

  if (weatherSource === WEATHER_SOURCE_STORMGLASS_NAME) {
    const params = "airTemperature";

    fetch(`https://api.stormglass.io/v1/weather/point?lat=${latitude}&lng=${longitude}&params=${params}`,
      {
        headers: {
          Authorization: WEATHER_STORMGLASS_API_KEY
        }
      })
      .then(handleRequestErrors)
      .then(response => response.json())
      .then(data => {
        dispatch(getCurrentWeatherSuccess(data.hours[0].airTemperature[0]));

        return data.hours[0].airTemperature[0];
      })
      .then(currentWeather =>
        dispatch(
          pushCurrentWeatherToCache({
            latitude,
            longitude,
            weatherSource,
            currentWeather,
            createdAt: Date.now()
          })
        )
      )
      .catch(error => dispatch(getCurrentWeatherFailed(error.message)));
  }
};

export const getAirTemperatureFromState = currentWeatherState => {
  if (Object.keys(currentWeatherState).length) {
    const airTemp = currentWeatherState.temp_c || currentWeatherState.value;

    return airTemp.toString();
  }

  return "";
};

const mapStateToProps = state => ({
  selectedLocationName: state.home.locations.selectedLocationName,
  locations: state.home.locations.items,
  isLoadingLocations: state.home.locations.loading,
  selectedWeatherSource: state.home.weather.weatherSource,
  isLoadingAirTemperature: state.home.weather.loading,
  airTemperature: getAirTemperatureFromState(state.home.weather.currentWeather)
});

const mapDispatchToProps = dispatch => ({
  getCurrentPosition: () => dispatch(getCurrentPosition()),
  getLocations: searchPhrase => dispatch(getLocations(searchPhrase)),
  getWeather: (latitude, longitude) =>
    dispatch(getWeather(latitude, longitude)),
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
