import * as yargs from 'yargs'
import * as dotenv from 'dotenv'

import {
  Arguments,
  WeatherResponseData,
  WeatherErrorData,
  TimeResponseData,
  TimeErrorData,
  LocationInfoMap,
} from './types'
import WeatherFetcher from './weather-fetcher'
import TimeFetcher from './time-fetcher'

dotenv.config()

const argv: Arguments = yargs.options({}).argv

const weatherFetcher: WeatherFetcher = new WeatherFetcher()
const timeFetcher: TimeFetcher = new TimeFetcher()

const locations: string[] = argv._.join(' ')
  .split(',')
  .map(input => input.trim())

const locationMap: LocationInfoMap = {}

locations.forEach(async location => {
  await weatherFetcher
    .getWeather(location)
    .then(
      (weather: WeatherResponseData) => (locationMap[location] = { weather })
    )
    .catch(
      (err: WeatherErrorData) => (locationMap[location] = { weather: err })
    )
  const {
    weather: {
      coord
    },
  } = locationMap[location]

  await timeFetcher
    .getTime(coord?.lon, coord?.lat)
    .then(res => {
      locationMap[location].time = res
    })
    .catch(err => {
      locationMap[location].time = err
    })

  const message: string = `${location}, ${locationMap[location].weather.main.temp}, ${locationMap[location].time.formatted}`
  console.log(message)
})
