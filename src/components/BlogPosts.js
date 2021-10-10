import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllBlogPosts } from '../reducers/blogPostReducer'
import userService from '../services/users'

const SmallBlogPost = ({ blogPost }) => {

  const [blogPostAuthor, setBlogPostAuthor] = useState({})

  useEffect(() => {
    const getAuthor = async () => {
      const data = await userService.getUser(blogPost.author) 
      console.log(data)
      setBlogPostAuthor(data)
    }

    getAuthor()
  }, [])

  /*

  <div className="blogPostPreviewText">
            {blogPost.text.length < 280 ? blogPost.text.slice(0, 280) :
            (
              blogPost.text.slice(0, 280) + '...'
            )}
          </div>

  */

  return (
      <Link to={`/blog-post/${blogPost._id}`} className="blogPostThumbnail">
        <div>
          <div className="blogPostTitle">{blogPost.title}</div>
          <div>
            <span className="blogPostAuthor">{blogPostAuthor.fullName || blogPostAuthor.username}</span>
            <i class="fas fa-comment"></i> {blogPost.comments.length}
          </div>
          
        </div>
        <div>
          <img src={blogPost.headerImageURL || "https://cdn.theathletic.com/cdn-cgi/image/quality=85,height=800/app/uploads/2021/10/08082532/GettyImages-1313693991-1024x683.jpg"} alt={blogPost.title} className="blogPostImage"/>
        </div>
      </Link>
  )
}

const BlogPosts = (props) => {
  const blogPosts = props.blogPosts
  return (
    <div class="blogList">
      {blogPosts.map((blogPost) => {
        return (
          <SmallBlogPost key={blogPost._id} blogPost={blogPost} />
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogPosts: state.blogPosts
  }
}

const mapDispatchToProps = {
  getAllBlogPosts
}

const ConnectedBlogPosts = connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPosts)

export default ConnectedBlogPosts;