import axios from "../config/axios"
const userApi = {}

userApi.getUserProfile = (profileUserId) => axios.get(`/users/${profileUserId}`)
userApi.updateUserProfile = (data) => axios.patch(`/users`, data)

export default userApi;