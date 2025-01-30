// import dayjs, { type Dayjs } from 'dayjs';
import dotenv from 'dotenv';
dotenv.config();

// x TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
}

// TODO: Define a class for the Weather object
// class Weather {
//   city: string;
//   date: Dayjs | string;
//   tempF: number;
//   windSpeed: number;
//   humidity: number;
//   icon: string;
//   iconDescription: string;
//   constructor(
//     city: string,
//     date: Dayjs | string,
//     tempF: number,
//     windSpeed: number,
//     humidity: number,
//     icon: string,
//     iconDescription: string
//   ) {
//     this.city = city;
//     this.date = date;
//     this.tempF = tempF;
//     this.windSpeed = windSpeed;
//     this.humidity = humidity;
//     this.icon = icon;
//     this.iconDescription = iconDescription;
//   }
// }

// xTODO: Complete the WeatherService class
 // xTODO: Define the baseURL, API key, and city name properties
class WeatherService {
  private baseURL?: string;
  private apiKey?: string;
  // private city = '';

  constructor () {

    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';

  }
 
  // x TODO: Create fetchLocationData method
 private async fetchLocationData(city: string) {
    try {
      const response = await fetch(
        `${this.baseURL}/data/2.5/weather?q=${city}&appid=${this.apiKey}`
      )
      
      const location = await response.json();

      const locationData: Coordinates = {
        lat: location.coord.lat,
        lon: location.coord.lon,
        name: location.name,
        country: location.sys.country,
      }
      return locationData

    } catch (err) {
      console.log('Error', err)
      return err;
    }
  }


  getWeatherForCity = async (city: string) => {

    const location: Coordinates = await this.fetchLocationData(city) as Coordinates
 
    const coordinateData = await fetch(
          `${this.baseURL}/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${this.apiKey}`
    )
    return coordinateData
  }
}



export default new WeatherService();