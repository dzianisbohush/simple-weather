import { WEATHER_SOURCE_APIXU_NAME } from "../../data/constants";

// CONSTANTS
//current position
export const HOME_SET_CURRENT_POSITION = "HOME_SET_CURRENT_POSITION";

//locations
export const HOME_SET_SELECTED_LOCATION = "HOME_SET_SELECTED_LOCATION";
export const HOME_GET_LOCATIONS_START = "HOME_GET_LOCATIONS_START";
export const HOME_GET_LOCATIONS_SUCCESS = "HOME_GET_LOCATIONS_SUCCESS";
export const HOME_GET_LOCATIONS_FAILURE = "HOME_GET_LOCATIONS_FAILURE";
export const HOME_PUSH_LOCATIONS_TO_CACHE = "HOME_PUSH_LOCATIONS_TO_CACHE";
export const HOME_SET_UPDATED_LOCATIONS_CACHE =
  "HOME_SET_UPDATED_LOCATIONS_CACHE";

//weather
export const HOME_GET_CURRENT_WEATHER_START = "HOME_GET_CURRENT_WEATHER_START";
export const HOME_GET_CURRENT_WEATHER_SUCCESS =
  "HOME_GET_CURRENT_WEATHER_SUCCESS";
export const HOME_GET_CURRENT_WEATHER_FAILED =
  "HOME_GET_CURRENT_WEATHER_FAILED";
export const HOME_SET_WEATHER_SOURCE = "HOME_SET_WEATHER_SOURCE";
export const HOME_PUSH_CURRENT_WEATHER_TO_CACHE =
  "HOME_PUSH_CURRENT_WEATHER_TO_CACHE";
export const HOME_SET_UPDATED_CURRENT_WEATHER_CACHE =
  "HOME_SET_UPDATED_CURRENT_WEATHER_CACHE";

const initialState = {
  currentPosition: {},
  locations: {
    items: [],
    selectedLocationName: "",
    cachedRequests: [],
    loading: false,
    error: ""
  },
  weather: {
    weatherSource: WEATHER_SOURCE_APIXU_NAME,
    currentWeather: {},
    cachedRequests: [],
    loading: false,
    error: ""
  }
};

// ACTIONS
//position
export const setCurrentPosition = payload => ({
  type: HOME_SET_CURRENT_POSITION,
  payload
});

//weather
export const getCurrentWeatherStart = () => ({
  type: HOME_GET_CURRENT_WEATHER_START
});

export const getCurrentWeatherSuccess = payload => ({
  type: HOME_GET_CURRENT_WEATHER_SUCCESS,
  payload
});

export const getCurrentWeatherFailed = payload => ({
  type: HOME_GET_CURRENT_WEATHER_FAILED,
  payload
});

export const pushCurrentWeatherToCache = payload => ({
  type: HOME_PUSH_CURRENT_WEATHER_TO_CACHE,
  payload
});

export const setUpdatedCurrentWeatherCache = payload => ({
  type: HOME_SET_UPDATED_CURRENT_WEATHER_CACHE,
  payload
});

export const setWeatherSource = payload => ({
  type: HOME_SET_WEATHER_SOURCE,
  payload
});

//locations
export const getLocationsStart = () => ({
  type: HOME_GET_LOCATIONS_START
});

export const getLocationsSuccess = payload => ({
  type: HOME_GET_LOCATIONS_SUCCESS,
  payload
});

export const getLocationsFailure = payload => ({
  type: HOME_GET_LOCATIONS_FAILURE,
  payload
});

export const pushLocationsToCache = payload => ({
  type: HOME_PUSH_LOCATIONS_TO_CACHE,
  payload
});

export const setUpdatedLocationsCache = payload => ({
  type: HOME_SET_UPDATED_LOCATIONS_CACHE,
  payload
});

export const setSelectedLocation = payload => ({
  type: HOME_SET_SELECTED_LOCATION,
  payload
});

// REDUCER
export default function homeReducer(state = initialState, action) {
  switch (action.type) {
    //position
    case HOME_SET_CURRENT_POSITION:
      return {
        ...state,
        currentPosition: action.payload
      };

    //locations
    case HOME_SET_SELECTED_LOCATION:
      return {
        ...state,
        locations: {
          ...state.locations,
          selectedLocationName: action.payload
        }
      };
    case HOME_GET_LOCATIONS_START:
      return {
        ...state,
        locations: {
          ...state.locations,
          loading: true
        }
      };
    case HOME_GET_LOCATIONS_SUCCESS:
      return {
        ...state,
        locations: {
          ...state.locations,
          items: action.payload,
          loading: false
        }
      };
    case HOME_GET_LOCATIONS_FAILURE:
      return {
        ...state,
        locations: {
          ...state.locations,
          error: action.payload,
          loading: false
        }
      };
    case HOME_PUSH_LOCATIONS_TO_CACHE:
      return {
        ...state,
        locations: {
          ...state.locations,
          cachedRequests: [...state.locations.cachedRequests, action.payload]
        }
      };
    case HOME_SET_UPDATED_LOCATIONS_CACHE:
      return {
        ...state,
        locations: {
          ...state.locations,
          cachedRequests: action.payload
        }
      };

    //weather
    case HOME_GET_CURRENT_WEATHER_START:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: true
        }
      };
    case HOME_GET_CURRENT_WEATHER_SUCCESS:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: false,
          currentWeather: action.payload
        }
      };
    case HOME_GET_CURRENT_WEATHER_FAILED:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: false,
          error: action.payload
        }
      };
    case HOME_PUSH_CURRENT_WEATHER_TO_CACHE:
      return {
        ...state,
        weather: {
          ...state.weather,
          cachedRequests: [...state.weather.cachedRequests, action.payload]
        }
      };
    case HOME_SET_UPDATED_CURRENT_WEATHER_CACHE:
      return {
        ...state,
        weather: {
          ...state.weather,
          cachedRequests: action.payload
        }
      };
    case HOME_SET_WEATHER_SOURCE:
      return {
        ...state,
        weather: {
          ...state.weather,
          weatherSource: action.payload
        }
      };
    default:
      return state;
  }
}