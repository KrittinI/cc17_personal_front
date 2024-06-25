const ACCESS_TOKEN = 'ACCESS_TOKEN'
const UUID = 'UUID'

export const setAccessToken = (token) =>
    localStorage.setItem(ACCESS_TOKEN, token)

export const setAccessUUID = (uuid, token) =>
    localStorage.setItem(uuid, token)

export const getAccessToken = () =>
    localStorage.getItem(ACCESS_TOKEN)

export const setGetUUID = () =>
    localStorage.getItem(UUID)

export const removeAccessToken = () =>
    localStorage.removeItem(ACCESS_TOKEN)

export const removeAccessUUID = () =>
    localStorage.removeItem(UUID)