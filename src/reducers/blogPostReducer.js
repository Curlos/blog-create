import blogPostService from '../services/blogPosts'

const blogPostReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOG_POSTS':
      return action.data
    default:
      return state
  }
}

export const getAllBlogPosts = () => {
  return async dispatch => {
    const blogs = await blogPostService.getAll()
    dispatch({
      type: 'INIT_BLOG_POSTS',
      data: blogs
    })
  }
}

export default blogPostReducer;