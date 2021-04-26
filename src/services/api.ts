import axios from 'axios'

const api = axios.create({
    baseURL: 'https://my-json-server.typicode.com/Jefferson00/PlantManager'
})

export default api;