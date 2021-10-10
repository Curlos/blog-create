import axios from 'axios';

const baseURL = 'http://localhost:8888/blogs'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const getOneBlogPost = async (blogID) => {
  const response = await axios.get(baseURL + `/blog-post/${blogID}`)
  console.log(response)
  return response.data
}

const postBlog = async (blogPostBody) => {
  const response = await axios.post(baseURL, blogPostBody)
  console.log(response)
  return response.data
}

export default { getAll, getOneBlogPost, postBlog }
