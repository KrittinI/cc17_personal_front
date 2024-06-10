import axios from "../config/axios"
const eventApi = {}

eventApi.getAllEvent = () => axios.get(`/events`)
eventApi.getEventById = (id) => axios.get(`/events/${id}`)
eventApi.getEventByCourdId = (id) => axios.get(`/events/court/${id}`)
eventApi.createEvent = (data) => axios.post(`/events/`, data)
eventApi.updateEvent = (id, data) => axios.patch(`/events/${id}`, data)

export default eventApi;