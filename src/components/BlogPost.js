import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import blogService from '../services/blogPosts'
import userService from '../services/users'
import commentService from '../services/comments'

const Comment = ({comment}) => {

  const [commentAuthor, setCommentAuthor] = useState({})

  useEffect(() => {
    const fetchCommentAuthor = async () => {
      const data = await userService.getUser(comment.userID)
      console.log(data)
      setCommentAuthor(data)
    }

    fetchCommentAuthor()
  }, [])

  return (
    <div className="commentContainer">
      <div class="commentHeader">
        <span className="commentAuthor">{commentAuthor.fullName || commentAuthor.username}</span>
        <span>{comment.timestamp}</span>
        <span>{comment.likes} likes</span>
      </div>

      <div className="commentText">
        {comment.text}
      </div>

      <div className="commentFooter">
        <i class="far fa-heart"></i> {comment.likes}
        <i class="fas fa-reply"></i>
      </div>
    </div>
  )
}

const BlogPost = (props) => {
  const { id } = useParams()
  const [blogPost, setBlogPost] = useState({})
  const [author, setAuthor] = useState({})
  const [comments, setComments] = useState([])
  const [showAddComment, setShowAddComment] = useState(false)
  const [blogComment, setBlogComment] = useState('')
  const isLoggedIn = props.user.user !== undefined

  console.log(props)
  console.log(isLoggedIn)

  useEffect(() => {
    const fetchFromAPI = async () => {
      const currBlogPost = await blogService.getOneBlogPost(id)
      const currAuthor = await userService.getUser(currBlogPost[0].author)

      const currComments = []
      
      for (let commentID of currBlogPost[0].comments) {
        const commentData = await commentService.getOneComment(commentID)

        console.log(commentData[0])
        currComments.push(commentData[0])
      }

      setBlogPost(currBlogPost[0])
      setAuthor(currAuthor)
      setComments(currComments)
    }

    fetchFromAPI()
  }, [id])

  const toggleShowAddComment = () => {
    setShowAddComment(!showAddComment)
  }

  const handleBlogCommentChange = (e) => {
    setBlogComment(e.target.value)
  }

  const handlePostComment = async () => {

    // const data = commentService.postComment()
  }


  return (
    <div class="blogPostContainer">
      <h1 class="blogPostTitle">{blogPost.title}</h1>
      <img src={blogPost.image || `https://cdn.theathletic.com/app/uploads/2021/10/08082532/GettyImages-1313693991-scaled.jpg`} alt={blogPost.title} className="blogPostImage" />
      <div>By {author.fullName}</div>
      <div class="blogPostText">
        {blogPost.text}
      </div>

      <div className="commentsInfo">
        <div className="totalComments">
          <i className="far fa-comments"></i>
          <span> {comments.length} COMMENTS</span>
        </div>
        
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
      </div>

      <div class="blogPostComments">
        {comments && comments.map((comment) => {
          return (
            <Comment comment={comment}/>
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