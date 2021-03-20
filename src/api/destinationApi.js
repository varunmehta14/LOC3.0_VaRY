import axios from 'axios'

const destinationApi = axios.create({
    baseURL: 'http://localhost:3000/destinationApi',
})

// export const insertUser = payload => userApi.post(`/user`, payload)
// export const getAllUsers = () => userApi.get(`/users`)
// export const updateUserById = (id, payload) => userApi.put(`/user/${id}`, payload)
// export const deleteUserById = id => userApi.delete(`/user/${id}`)
export const getDestinationById = id => destinationApi.get(`/destination/${id}`)

const destinationApis = {
    // insertUser,
    // getAllUsers,
    // updateUserById,
    // deleteUserById,
    getDestinationById,
}

export default destimationApis;