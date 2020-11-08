import client from './client'

function getPerson (name) {
  return client.get('/people', { params: { search: name } })
}

function getMovies (name) {
  return client.get('/movies', { params: { search: name } })
}

export default {
  getPerson,
  getMovies
}
