import axios, { AxiosResponse, AxiosError } from 'axios'

class WeatherFetcher {
  numberRegex: RegExp = /[\d]+/
  baseURL: string = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}`

  async getWeather(location: string): Promise<any> {
    let url: string
    if (!this.numberRegex.test(location)) {
      url = `${this.baseURL}&q=${location}`
    } else {
      url = `${this.baseURL}&zip=${location}`
    }
    return axios
      .get(url)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => {
        throw err.response.data
      })
  }
}

export default WeatherFetcher
