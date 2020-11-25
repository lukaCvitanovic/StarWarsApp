import axios from 'axios'

const baseURL = 'https://swapi.dev/api'
const config = { baseURL }
const client = axios.create(config)
client.interceptors.response.use(res => res, err => {
  err.response
    ? Promise.reject(err.response)
    : Promise.reject(err)
})

export default client
