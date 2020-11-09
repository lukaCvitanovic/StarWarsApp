import client from './client'

function getPeopleByName (name) {
  return client.get('/people', { params: { search: name } })
}

function getPeopleById (id) {
  return client.get(`/people/${id}`)
}

function getMoviesByName (name) {
  return client.get('/movies', { params: { search: name } })
}

function getMoviesById (id) {
  return client.get(`/movies/${id}`)
}

function get (path) {
  return client.get(path)
}

export default {
  getPeopleByName,
  getPeopleById,
  getMoviesByName,
  getMoviesById,
  get
}
