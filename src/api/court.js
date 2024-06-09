import axios from "../config/axios"
const courtApi = {}

courtApi.getAllCourt = () => axios.get('/courts')
courtApi.getCourtById = (id) => axios.get(`/courts/${id}`)
courtApi.createCourt = (data) => axios.post(`/courts`, data)

export default courtApi;