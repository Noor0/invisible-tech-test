import * as yargs from 'yargs'
import * as dotenv from 'dotenv'

import {
  Arguments,
  WeatherResponseData,
  TimeResponseData,
  LocationInfoMap,
} from './types'
import WeatherFetcher from './weather-fetcher'
import TimeFetcher from './time-fetcher'

dotenv.config()

const weatherFetcher: WeatherFetcher = new WeatherFetcher()
const timeFetcher: TimeFetcher = new TimeFetcher()

const argv: Arguments = yargs.options({}).argv
const locations = argv._.join(' ')
  .split(',')
  .map(input => input.trim())

const main = async () => {
  for (let location of locations) {
    console.log('--------')
    console.log(location)
    const weather = await fetchWeather(location)
    if (weather.coord) {
      await fetchTime(weather.coord.lat, weather.coord.lon)
    }
  }
}

const fetchWeather = (location: string): Promise<WeatherResponseData> => {
  return weatherFetcher
    .getWeather(location)
    .then((weather: WeatherResponseData) => {
      console.log(`${weather.main.temp}°C`)
      return weather
    })
    .catch((err: WeatherResponseData) => {
      console.log(err.message)
      return err
    })
}

const fetchTime = (long: number, lat: number): Promise<TimeResponseData> => {
  return timeFetcher
    .getTime(long, lat)
    .then(time => {
      console.log(time.formatted.split(' ')[1])
      return time
    })
    .catch(err => {
      console.log(err.message)
      return err
    })
}

main()
