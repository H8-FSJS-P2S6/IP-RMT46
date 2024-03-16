const axios = require('axios');
module.exports = class WeatherController {
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
      const responseLocation = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.APIKEY_ACCUWEATHER}&q=${city}`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }

      const responseCurrentCondition = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${responseLocation.data[0].Key}?apikey=${process.env.APIKEY_ACCUWEATHER}`)
      if (responseCurrentCondition.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "Weather not found!",
        };
      }
      res.status(200).json(responseCurrentCondition.data[0]);
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
      const responseLocation = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.APIKEY_ACCUWEATHER}&q=${city}`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }
      // console.log(responseLocation.data[0].Key)

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
      const responseLocation = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.APIKEY_ACCUWEATHER}&q=${city}`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }

      const lat = responseLocation.data[0].GeoPosition.Latitude
      const lon = responseLocation.data[0].GeoPosition.Longitude

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
      const responseLocation = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${process.env.APIKEY_ACCUWEATHER}&q=${city}`)
      if (responseLocation.status !== 200) {
        throw {
          name: "ErrorCustom",
          status: 404,
          message: "City not found!",
        };
      }
      const lat = responseLocation.data[0].GeoPosition.Latitude
      const lon = responseLocation.data[0].GeoPosition.Longitude

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
