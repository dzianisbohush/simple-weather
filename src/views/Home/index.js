import {WEATHER_SOURCE_APIXU_NAME} from '../../data/constants';

// CONSTANTS
export const HOME_SET_SELECTED_LOCATION = 'HOME_SET_SELECTED_LOCATION';
export const HOME_SET_CURRENT_POSITION = 'HOME_SET_CURRENT_POSITION';
export const HOME_SET_LOCATIONS = 'HOME_SET_LOCATIONS';
export const HOME_CLEAR_LOCATIONS = 'HOME_CLEAR_LOCATIONS';
export const HOME_SET_CURRENT_WEATHER = 'HOME_SET_CURRENT_WEATHER';
export const HOME_SET_WEATHER_SOURCE = 'HOME_SET_WEATHER_SOURCE';

const initialState = {
  locations: [],
  currentPosition: {},
  selectedLocationName: '',
  currentWeather : {},
  weatherSource: WEATHER_SOURCE_APIXU_NAME
};

// ACTIONS
export const setSelectedLocation = payload => ({
  type: HOME_SET_SELECTED_LOCATION,
  payload
});

export const setCurrentPosition = payload => ({
  type: HOME_SET_CURRENT_POSITION,
  payload
});

export const setCurrentWeather = payload => ({
  type: HOME_SET_CURRENT_WEATHER,
  payload
});

export const setWeatherSource = payload => ({
  type: HOME_SET_WEATHER_SOURCE,
  payload
});

export const setLocations = payload => ({
  type: HOME_SET_LOCATIONS,
  payload
});

export const clearLocations = () => ({
  type: HOME_CLEAR_LOCATIONS
});

// REDUCER
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    case HOME_SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocationName: action.payload
      };
      case HOME_SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload
      };
      case HOME_SET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      };
      case HOME_SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload
      };
      case HOME_CLEAR_LOCATIONS:
      return {
        ...state,
        locations: []
      };
    case HOME_SET_WEATHER_SOURCE:
      return {
        ...state,
        weatherSource: action.payload
      };
    default:
      return state;
  }
}
