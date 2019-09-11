import axios, { AxiosResponse, AxiosError } from 'axios'

class TimeFetcher {
  baseURL: string = `http://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.TIME_API_KEY}&by=position&format=json`

  getTime(lat: number, long: number): Promise<any> {
    let url: string = `${this.baseURL}&lat=${lat}&lng=${long}`
    return axios
      .get(url)
      .then((res: AxiosResponse) => res.data)
      .catch((err: AxiosError) => {
        throw err.response.data
      })
  }
}

export default TimeFetcher
