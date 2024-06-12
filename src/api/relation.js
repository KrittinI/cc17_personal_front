import axios from "../config/axios"
const relationApi = {}

relationApi.createRelation = eventId => axios.post(`/relations/${eventId}`)
relationApi.getPlayerFromEventId = eventId => axios.get(`/relations/event/${eventId}`)
relationApi.getEventByUserId = userId => axios.get(`/relations/user/${userId}`)
relationApi.deleteRelationByUser = eventId => axios.delete(`/relations/event/${eventId}`)
relationApi.deleteAllPlayerByEventId = eventId => axios.delete(`/relations/${eventId}`)
relationApi.deleteRelationByCreator = (eventId, userId) => axios.delete(`/relations/event/${eventId}/user/${userId}`)

export default relationApi;


