import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../reducers/userReducer'

const Register = (props) => {

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const history = useHistory()

  useEffect(() => {
    if (props.user.user) {
      history.push('/')
    }
  }, [props.user])

  const handleFullNameChange = (e) => {
    setFullName(e.target.value)
  }

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
      fullName: fullName,
      username: username,
      password: password
    }

    const data = await props.registerUser(userInfo)
    console.log(data)
    console.log(props.user)
  }

  return (
    <form onSubmit={handleLogin} className="registerForm">
      <div>
        <input value={fullName} placeholder="Full Name" onChange={handleFullNameChange}/>
      </div>
      <div>
        <input value={username} placeholder="Username" onChange={handleUsernameChange}/>
      </div>
      <div>
        <input value={password} placeholder="Password" onChange={handlePasswordChange}/>
      </div>
      <div>
        <button type="submit">Register</button>
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
  registerUser
}

const ConnectedRegister = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default ConnectedRegister;