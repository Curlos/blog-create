import React, { useEffect } from 'react'
import './style.scss';
import { connect } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBlogPosts } from './reducers/blogPostReducer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header'
import BlogPosts from './components/BlogPosts'
import BlogPost from './components/BlogPost'
import Login from './components/Login'

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogPosts())
  }, [dispatch])

  const blogPosts = useSelector(state => state.blogPosts)
  const user = useSelector(state => state.user)

  console.log(blogPosts)

  return (
    <Router className="App">
      <div>
      <Header />
        <Switch>

          <Route path="/" exact>
            <BlogPosts />
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/blog-post/:id" exact>
            <BlogPost />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
