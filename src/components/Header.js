import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logOutUser } from '../reducers/userReducer'

const Header = (props) => {

  const handleLogout = () => {
    console.log(props)
    props.logOutUser()
  }

  return (
    <div className="headerContainer">
      <div>
        <i className="fas fa-search"></i>
      </div>
      
      <div className="title">
        <Link to="/">The Blog</Link>
      </div>

      {props.user.user ? (
        <div>
          <span>{props.user.user.fullName || props.user.user.username}</span>
          <Link to="/create-blog-post">Create Blog Post</Link>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div className="headerLinks">
          <Link to="/register">Register</Link>
          <Link to="/login">Log In</Link>
        </div>
      )}

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logOutUser
}

const ConnectedHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default ConnectedHeader;