import axios from "../config/axios"
const courtApi = {}

courtApi.getAllCourt = () => axios.get('/courts')
courtApi.getCourtById = (id) => axios.get(`/courts/${id}`)
courtApi.createCourt = (data) => axios.post(`/courts`, data)
courtApi.updateCourtData = (id, data) => axios.patch(`/courts/${id}`, data)
export default courtApi;