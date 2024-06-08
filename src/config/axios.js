import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
},
    error => Promise.reject(error)
)

axios.interceptors.response.use(value => Promise.resolve(value), err => {
    if (err.response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN')
        window.location.assign('/login')
        return;
    }
})
export default axios