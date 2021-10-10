import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux'
import blogService from '../services/blogPosts'
import userService from '../services/users'
import commentService from '../services/comments'
import Comment from './Comment'

const BlogPost = (props) => {
  const { id } = useParams()
  const [blogPost, setBlogPost] = useState({})
  const [author, setAuthor] = useState({})
  const [comments, setComments] = useState([])
  const [showAddComment, setShowAddComment] = useState(false)
  const [blogComment, setBlogComment] = useState('')
  const isLoggedIn = props.user.user !== undefined
  const loggedInUser = isLoggedIn && props.user.user

  useEffect(() => {
    const fetchFromAPI = async () => {
      const currBlogPost = await blogService.getOneBlogPost(id)
      const currAuthor = await userService.getUser(currBlogPost[0].author)

      const currComments = []
      
      for (let commentID of currBlogPost[0].comments) {
        const commentData = await commentService.getOneComment(commentID)
        currComments.push(commentData[0])
      }

      setBlogPost(currBlogPost[0])
      setAuthor(currAuthor)
      setComments(currComments)
    }

    fetchFromAPI()
  }, [])

  const toggleShowAddComment = () => {
    setShowAddComment(!showAddComment)
  }

  const handleBlogCommentChange = (e) => {
    setBlogComment(e.target.value)
    console.log(blogComment)
  }

  const handlePostComment = async () => {

    if (!isLoggedIn) {
      return false
    }


    const userID = loggedInUser._id
    const blogID = blogPost._id

    const commentBody = {
      text: blogComment,
      userID: userID,
      blogID: blogID,
      likes: 0,
      replies: []
    }

    console.log(commentBody)

    const response = await commentService.postComment(commentBody)
    const newComment = response.data

    setBlogComment('')
    console.log(comments)
    setComments([...comments, newComment])
    
    return response
  }


  return (
    <div class="blogPostContainer">
      <h1 class="blogPostTitle">{blogPost.title}</h1>
      <img src={blogPost.headerImageURL || `https://cdn.theathletic.com/app/uploads/2021/10/08082532/GettyImages-1313693991-scaled.jpg`} alt={blogPost.title} className="blogPostImage" />
      <div class="blogPostText">
        {ReactHtmlParser(blogPost.content)}
      </div>

      <footer className="contentFooter">By {author.fullName || author.username}</footer>

      <div className="commentsInfo">
        <div className="totalComments">
          <i className="far fa-comments"></i>
          <span> {comments.length} COMMENTS</span>
        </div>

        {isLoggedIn ? (
          <div>

            {!showAddComment ? (
              <textarea className="addCommentInitial" placeholder="Add a comment..." onClick={toggleShowAddComment}>
              </textarea>
            ) : (
              <span>
                <textarea className="addCommentContainer" placeholder="Add a comment..." value={blogComment} onChange={handleBlogCommentChange}>
                </textarea>

                <div className="addCommentButtons">
                  <button className="cancelButton" onClick={toggleShowAddComment}>Cancel</button>
                  <button className="postButton" onClick={handlePostComment}>Post</button>
                </div>
              </span>
            )}
          </div>
        ) : (
          <Link to="/login">Log in to comment</Link>
        )}
        
      </div>
      

      <div class="blogPostComments">
        {comments && comments.map((comment) => {
          return (
            <Comment comment={comment} loggedInUser={loggedInUser} blogPost={blogPost} />
          )
        })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedBlogPost = connect(
  mapStateToProps,
)(BlogPost)


export default ConnectedBlogPost;