import axios from 'axios';

const baseURL = 'http://localhost:8888/blogs'

const getOneComment = async (commentID) => {
  const response = await axios.get(`${baseURL}/comment/${commentID}`)
  console.log(response.data)
  return response.data
}

const postComment = async (commentBody) => {
  const response = await axios.post(`${baseURL}/blog-post/comment`)
  console.log(response.data)
  return response.data
}

export default { getOneComment, postComment }