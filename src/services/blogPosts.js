import axios from 'axios';

const baseURL = 'http://localhost:8888/blogs'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const getOneBlogPost = async (blogID) => {
  const response = await axios.get(baseURL + `/blog-post/${blogID}`)
  return response.data
}

export default { getAll, getOneBlogPost }
