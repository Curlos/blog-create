import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logInUser } from '../reducers/userReducer'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (props.user.user) {
      history.push('/')
    }
  }, [props.user])

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(password)

    const userInfo = {
      username: username,
      password: password
    }

    const data = await props.logInUser(userInfo)
    console.log(data)
    console.log(props.user)
  }

  return (
    <form onSubmit={handleLogin} className="loginForm">
      <div>
        <input value={username} placeholder="Username" onChange={handleUsernameChange}/>
      </div>
      <div>
        <input value={password} placeholder="Password" onChange={handlePasswordChange}/>
      </div>
      <div>
        <button type="submit">Log in</button>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logInUser
}

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export default ConnectedLogin;