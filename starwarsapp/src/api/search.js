import client from './client'

function getPersonByName (name) {
  return client.get('/people', { params: { search: name } })
}

function getPersonById (id) {
  return client.get(`/people/${id}`)
}

function getMoviesByName (name) {
  return client.get('/movies', { params: { search: name } })
}

function getMoviesById (id) {
  return client.get(`/movies/${id}`)
}

export default {
  getPersonByName,
  getPersonById,
  getMoviesByName,
  getMoviesById
}
