import axios from 'axios'

const userApi = axios.create({
    baseURL: 'http://localhost:3000/userApi',
})

export const insertUser = payload => userApi.post(`/user`, payload)
export const getAllUsers = () => userApi.get(`/users`)
export const updateUserById = (id, payload) => userApi.put(`/user/${id}`, payload)
export const deleteUserById = id => userApi.delete(`/user/${id}`)
export const getUserById = id => userApi.get(`/user/${id}`)

const userApis = {
    insertUser,
    getAllUsers,
    updateUserById,
    deleteUserById,
    getUserById,
}

export default userApis;