import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import userService from '../services/users'
import commentService from '../services/comments'

const Comment = (props) => {

  const {comment, loggedInUser, blogPost} = props.ownProps
  const [commentAuthor, setCommentAuthor] = useState({})
  const [likedComment, setLikedComment] = useState(loggedInUser && loggedInUser.likedComments.includes(comment._id))
  const [currComment, setCurrComment] = useState(comment)

  console.log(props)
  console.log(props.blogPosts)
  console.log(blogPost)

  useEffect(() => {
    const fetchCommentAuthor = async () => {
      const commentAuthor = await userService.getUser(comment.userID)
      console.log(commentAuthor)
      
      setCommentAuthor(commentAuthor)
    }

    fetchCommentAuthor()
  }, [])

  const handleToggleLike = async () => {
    if (!loggedInUser) {
      return false
    }
    console.log(comment)
    console.log(loggedInUser)
    console.log(likedComment)



    const commentBody = {
      commentID: comment._id,
      likedComment: likedComment,
      userID: loggedInUser._id
    }

    const response = await commentService.likeComment(commentBody)
    const newComment = response.data
    setCurrComment({...newComment})

    setLikedComment(!likedComment)
  }

  return (
    <div className="commentContainer">
      <div class="commentHeader">
        <span className="commentAuthor">{currComment.fullName || currComment.username}</span>
        <span>{currComment.timestamp}</span>
        <span>{currComment.likes} likes</span>
      </div>

      <div className="commentText">
        {comment.text}
      </div>

      <div className="commentFooter">
        <i class={`${likedComment ? 'likedComment fas' : 'far'} fa-heart`} onClick={handleToggleLike}></i> {currComment.likes}
        <i class="fas fa-reply"></i>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    blogPosts: state.blogPosts,
    ownProps
  }
}

const ConnectedComment = connect(
  mapStateToProps,
)(Comment)

export default ConnectedComment;