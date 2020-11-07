import client from './client'

function getPerson(name) {
  return client.get('/people', { search: name })
}

function getMovies(name) {
  return client.get('/movies', { search: name })
}

export default {
  getPerson,
  getMovies
}