import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'; 
import blogPostService from '../services/blogPosts'

const BlogPostForm = () => {
  const [title, setTitle] = useState('')
  const [headerImageURL, setHeaderImageURL] = useState('')
  const [editorContent, setEditorContent] = useState('')
  const [invalidTitle, setInvalidTitle] = useState(false)

  const user = useSelector(state => state.user)
  console.log(user)

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleHeaderImageURLChange = (e) => {
    setHeaderImageURL(e.target.value)
  }

  const handleEditorChange = (e) => {
    console.log(
      'Content was updated:',
      e.target.getContent()
    );

    setEditorContent(e.target.getContent())
  }

  const handlePostBlog = () => {
    console.log(editorContent)
    if (title === '') {
      setInvalidTitle(true)
    } else {
      setInvalidTitle(false)
      const blogPostBody = {
        title: title,
        headerImageURL: headerImageURL,
        content: editorContent,
        likes: 0,
        comments: [],
        author: user.user._id
      }
      blogPostService.postBlog(blogPostBody)
    }
  }

  console.log(invalidTitle)

 
  return (
    <div className="blogPostFormContainer">
      {user.user ? (
        <span>
          <div className={`formContainer`}><div>Title:</div> <input type="text" className={`${invalidTitle ? 'invalidTitle' : ''}`} value={title} onChange={handleTitleChange}></input></div>
          {invalidTitle ? <div className="invalidText">Title required</div> : ''}
          <div className="formContainer"><div>Header Image URL:</div> <input type="text" value={headerImageURL} onChange={handleHeaderImageURLChange}></input></div>
          <Editor
            initialValue="<p>Initial content</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                'advlist autolink lists link image', 
                'charmap print preview anchor help',
                'searchreplace visualblocks code',
                'insertdatetime media table paste wordcount image'
              ],
              menubar: 'file edit view insert format tools table tc help',
              toolbar:
                'undo redo | formatselect | bold italic | \
                alignleft aligncenter alignright | \
                bullist numlist outdent indent | help'
            }}
            onChange={handleEditorChange}
            className="editor"
          />
    
          <button onClick={handlePostBlog}>Post blog</button>
        </span>
      ) : (
        <Link to="/login">Log in to post a blog</Link>
      )}
    </div>
  );
}

export default BlogPostForm;