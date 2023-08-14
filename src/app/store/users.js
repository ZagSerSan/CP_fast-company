import { createAction, createSelector, createSlice } from '@reduxjs/toolkit'
import userService from '../service/users.service'
import authService from '../service/auth.services'
import localStorageService from '../service/localStorage.service'
import { randomInt } from '../utils/randomInt'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    auth: null,
    isLoggedIn: false
  },
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload 
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = {...action.payload, isLoggedIn: true}
    },
    authRequestFiled: (state, action) => {
      state.error = action.payload
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = []  
      }
      state.entities.push(action.payload)
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const {
  usersRequested,
  usersReceved,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFiled,
  userCreated
} = actions

const authRequested = createAction('users/authRequested')
const userCreateRequested = createAction('users/userCreateRequested')
const createUserFailed = createAction('users/createUserFailed')

// Sign Up
export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
  dispatch(authRequested())
  try {
    const data = await authService.register({email, password})
    localStorageService.setTokens(data)
    dispatch(authRequestSuccess({userId: data.localId}))
    dispatch(createUser({
      _id: data.localId,
      email,
      rate: randomInt(1, 5),
      completedMeetings: randomInt(0, 200),
      avatar: `https://avatars.dicebear.com/api/avataaars/${
        (Math.random() + 1).toString(36).substring(7)
      }.svg`,
      ...rest
    }))
  } catch (error) {
    dispatch(authRequestFiled(error.message))
  }
}
// todo
function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested())
    try {
      const {content} = await userService.create(payload)
      dispatch(userCreated(content))
    } catch (error) {
      dispatch(createUserFailed(error.message))
    }
  }
} 

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersReceved(content))
  } catch (error) {
    dispatch(usersRequestFiled(error.message))
  }
}

export const getUsers = () => (state) => state.users.entities
export const getUserById = (userId) => createSelector(
  state => state.users.entities,
  (state) => state.find(user => user._id === userId)
)

export default usersReducer
