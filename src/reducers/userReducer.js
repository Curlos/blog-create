import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log(action.data)
      return action.data
    case 'LOGOUT':
      return action.data
    case 'REGISTER':
      return action.data
    default:
      return state
  }
}

export const logInUser = (userInfo) => {
  return async dispatch => {
    const user = await userService.logInUser(userInfo)
    dispatch({
      type: 'LOGIN',
      data: user
    })
  }
}

export const logOutUser = () => {
  return async dispatch => {
    const user = await userService.logOutUser()
    dispatch({
      type: 'LOGOUT',
      data: user
    })
  }
}

export const registerUser = (userInfo) => {
  return async dispatch => {
    const user = await userService.registerUser(userInfo)
    dispatch({
      type: 'REGISTER',
      data: user
    })
  }
}

export default userReducer;