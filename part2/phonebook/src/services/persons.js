import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
   const promise = axios.get(baseUrl)
    
   return promise.then(response => response.data)
}

const create = (object) => {
    return axios.post(baseUrl, object)
}

const deleteFunc = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const editNumFunc = (id, object) => {
    return axios.put(`${baseUrl}/${id}`, object)
}


export default {getAll, create, deleteFunc, editNumFunc}
