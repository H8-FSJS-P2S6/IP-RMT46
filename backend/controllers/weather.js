const axios = require('axios');
module.exports = class WeatherController {
  static async getLocation(req, res, next) {
    try {
      const { city } = req.params;
      if (!city) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "City cannot be empty!",
        };
      }
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      if (response.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }
      res.status(200).json(response.data.results[0]);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentWeather(req, res, next) {
    try {
      const { city } = req.params;
      if (!city) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "City cannot be empty!",
        };
      }
      
      const responseLocation = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }

      const lat = responseLocation.data.results[0].latitude
      const lon = responseLocation.data.results[0].longitude
      const tz = responseLocation.data.results[0].timezone

      const responseCurrentCondition = await axios.get(`https://api.open-meteo.com/v1/dwd-icon?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=${tz}`)
      if (responseCurrentCondition.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "Weather not found!",
        };
      }
      res.status(200).json(responseCurrentCondition.data);
    } catch (error) {
      next(error);
    }
  }

  static async getForecastWeather(req, res, next) {
    try {
      const { city } = req.params;
      if (!city) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "City cannot be empty!",
        };
      }

      const responseLocation = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }

      const lat = responseLocation.data.results[0].latitude
      const lon = responseLocation.data.results[0].longitude

      const responseForecastCondition = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${responseLocation.data[0].Key}?apikey=${process.env.APIKEY_ACCUWEATHER}`)
      if (responseForecastCondition.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "Weather not found!",
        };
      }
      res.status(200).json(responseForecastCondition.data);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUV(req, res, next) {
    try {
      const { city } = req.params;
      if (!city) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "City cannot be empty!",
        };
      }
      const responseLocation = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }

      const lat = responseLocation.data.results[0].latitude
      const lon = responseLocation.data.results[0].longitude

      const response = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}`, {
        headers: {
          "x-access-token": process.env.APIKEY_OPENUV,
        },
      });
      if (response.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "UV not found!",
        };
      }
      res.status(200).json(response.data.result);
    } catch (error) {
      next(error);
    }
  }

  static async getForecastUV(req, res, next) {
    try {
      const { city } = req.params;
      if (!city) {
        throw {
          name: "ErrorCustom",
          status: 400,
          message: "City cannot be empty!",
        };
      }
      const responseLocation = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }

      const lat = responseLocation.data.results[0].latitude
      const lon = responseLocation.data.results[0].longitude

      const response = await axios.get(`https://api.openuv.io/api/v1/forecast?lat=${lat}&lng=${lon}`, {
        headers: {
          "x-access-token": process.env.APIKEY_OPENUV,
        },
      });
      if (response.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "UV not found!",
        };
      }
      res.status(200).json(response.data.result);
    } catch (error) {
      next(error);
    }
  }
};
