import axios from "../config/axios"
const eventApi = {}

eventApi.getAllEvent = () => axios.get(`/events`)
eventApi.getEventById = (id) => axios.get(`/events/${id}`)
eventApi.getEventByCourdId = (id) => axios.get(`/events/court/${id}`)
eventApi.getEventByUserId = (id) => axios.get(`/events/user/${id}`)
eventApi.createEvent = (data) => axios.post(`/events`, data)
eventApi.updateEvent = (id, data) => axios.patch(`/events/${id}`, data)
eventApi.deleteEvent = (id) => axios.delete(`/events/${id}`)

export default eventApi;