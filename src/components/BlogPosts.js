import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllBlogPosts } from '../reducers/blogPostReducer'

const SmallBlogPost = ({ blogPost }) => {
  return (
      <Link to={`/blog-post/${blogPost._id}`} className="blogPostThumbnail">
        <div>
          <div className="blogPostTitle">{blogPost.title}</div>
          <div>
            <span className="blogPostAuthor">{blogPost.author}</span>
            <i class="fas fa-comment"></i> {blogPost.comments.length}
          </div>
        </div>
        <div>
          <img src="https://cdn.theathletic.com/cdn-cgi/image/quality=85,height=800/app/uploads/2021/10/08082532/GettyImages-1313693991-1024x683.jpg" alt={blogPost.title} className="blogPostImage"/>
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