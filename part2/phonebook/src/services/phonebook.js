// Service module to handle requests for json-server

import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteContact = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const edit = newObject => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return request.then(response => response.data)
}

const phonebookService = {getAll, create, deleteContact, edit}

export default phonebookService