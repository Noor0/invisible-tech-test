export interface Arguments {
  [x: string]: unknown
  _: string[]
  $0: string
}

export interface WeatherResponseData {
  coord: {
    lon: number
    lat: number
  }
  main: {
    temp: number
    temp_min: number
    temp_max: number
  }
  name: string
  cod: number
  message: string
}

export interface TimeResponseData {
  status: string
  timestamp: number
  formatted: string
  message: string
}

export interface LocationInfo {
  weather: WeatherResponseData
  time?: TimeResponseData
}

export interface LocationInfoMap {
  [key: string]: LocationInfo
}
