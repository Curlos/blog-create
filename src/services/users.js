import axios from 'axios';

const baseURL = 'http://localhost:8888/users'

const logInUser = async (body) => {
  const response = await axios.post(`${baseURL}/login`, body)

  console.log(response.data)
  return response.data
}

const logOutUser = async () => {
  const response = await axios.get(`${baseURL}/logout`)

  console.log(response.data)
  return response.data
}

const getUser = async (userID) => {
  const response = await axios.get(`${baseURL}/user/${userID}`)
  console.log(response.data)
  return response.data
}

export default { logInUser, logOutUser, getUser }