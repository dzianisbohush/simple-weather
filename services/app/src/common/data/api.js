import {
  WEATHER_APIXU_API_KEY,
  WEATHER_APIXU_BASE_URL,
  WEATHER_SOURCE_APIXU_NAME,
  WEATHER_SOURCE_STORMGLASS_NAME,
  WEATHER_STORMGLASS_BASE_URL,
  WEATHER_STORMGLASS_API_KEY,
  OPENCAGEDATA_BASE_URL,
  OPENCAGEDATA_API_KEY
} from 'common/data/constants';

export const getCoordinatesFromLocationName = async locationName => {
  try {
    if(!OPENCAGEDATA_API_KEY) {
      throw Error('API key is not found');
    }

    const response = await fetch(
      `${OPENCAGEDATA_BASE_URL}/json?key=${OPENCAGEDATA_API_KEY}&q=${locationName}&pretty=1`
    );
    const data = await response.json();
    if (!data.error) {
      const {
        formatted: formattedLocationName,
        geometry: { lat, lng }
      } = data.results[0];

      return {
        formattedLocationName,
        lat,
        lng
      };
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const getCurrentPosition = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    return data.city;
  } catch (e) {
    console.log(e.message);
  }
};

export const getWeather = async (cityName, weatherSource) => {
  try {
    const coordinates = await getCoordinatesFromLocationName(cityName);

    if(!coordinates) {
      return;
    }

    const { formattedLocationName, lat, lng } = coordinates;

    if (weatherSource === WEATHER_SOURCE_APIXU_NAME) {
      if(!WEATHER_APIXU_API_KEY) {
        throw Error('API key is not found');
      }

      const response = await fetch(
        `${WEATHER_APIXU_BASE_URL}/current.json?key=${WEATHER_APIXU_API_KEY}&q=${lat},${lng}`
      );
      const data = await response.json();

      if (!data.error) {
        return {
          airTemperature: Math.round(data.current.temp_c).toString(),
          weatherIconAddress: data.current.condition.icon,
          formattedLocationName
        };
      }
    }

    if (weatherSource === WEATHER_SOURCE_STORMGLASS_NAME) {
      if(!WEATHER_STORMGLASS_API_KEY) {
        throw Error('API key is not found');
      }

      const params = 'airTemperature';
      const response = await fetch(
        `${WEATHER_STORMGLASS_BASE_URL}/weather/point?lat=${lat}&lng=${lng}&params=${params}`,
        {
          headers: {
            Authorization: WEATHER_STORMGLASS_API_KEY
          }
        }
      );
      const data = await response.json();

      if (!data.error) {
        return {
          airTemperature: Math.round(
            data.hours[0].airTemperature[0].value
          ).toString(),
          formattedLocationName,
          weatherIconAddress: ''
        };
      }
    }
  } catch (e) {
    console.log(e.message);
  }
};
