import axios from 'axios'

const baseURI = 'https:///swapi.dev/api'
const config = { baseURI }
const client = axios.create(config)
client.interceptors.response.use(res => res, err => Promise.reject(err.response))

export default client