import client from './client'

function getPeopleByName (name) {
  return client.get('/people', { params: { search: name } })
}

function getPeopleById (id) {
  return client.get(`/people/${id}`)
}

function getMoviesByName (name) {
  return client.get('/films', { params: { search: name } })
}

function getMoviesById (id) {
  return client.get(`/films/${id}`)
}

function get (path) {
  return client.get(path)
}

function callGet (url) {
  return new Promise((resolve, reject) => {
    get(url)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

function callPeopleById (id) {
  return new Promise((resolve, reject) => {
    getPeopleById(id)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

function callPeopleByName (name) {
  return new Promise((resolve, reject) => {
    getPeopleByName(name)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

function callMoviesById (id) {
  return new Promise((resolve, reject) =>
    getMoviesById(id)
      .then(data => resolve(data))
      .catch(error => reject(error))
  )
}

function callMoviesByName (name) {
  return new Promise((resolve, reject) => {
    getMoviesByName(name)
      .then(data => resolve(data))
      .catch(error => reject(error))
  })
}

export default {
  callGet,
  callMoviesById,
  callMoviesByName,
  callPeopleById,
  callPeopleByName
}
