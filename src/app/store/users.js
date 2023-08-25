import { createAction, createSelector, createSlice } from '@reduxjs/toolkit'
import userService from '../service/users.service'
import authService from '../service/auth.services'
import localStorageService from '../service/localStorage.service'
import { randomInt } from '../utils/randomInt'
import history from '../utils/history'

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: {userId: localStorageService.getUserId()},
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true
    },
    usersReceved: (state, action) => {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload 
      state.isLoading = false
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload
      state.isLoggedIn = true
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

// login
export const login = ({payload, redirect}) => async (dispatch) => {
  const {email, password} = payload
  dispatch(authRequested())
  try {
    const data = await authService.login(email, password)
    dispatch(authRequestSuccess({userId: data.localId}))
    localStorageService.setTokens(data)
    history.push(redirect)
  } catch (error) {
    dispatch(authRequestFiled(error.message))
  }
}

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
    history.push('/users')
  } catch (error) {
    dispatch(authRequestFiled(error.message))
  }
}

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
export const getCurrentUserData = () => createSelector(
  state => state.users,
  (state) => {
    return state.entities
      ? state.entities.find(user => user._id === state.auth?.userId)
      : null
  }
)
export const getUserById = (userId) => createSelector(
  state => state.users.entities,
  (state) => state.find(user => user._id === userId)
)
export const updateUserData = () => (state) => state.users.isLoggedIn
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn
export const getDataStatus = () => (state) => state.users.dataLoaded
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
export const getCurrentUserId = () => (state) => state.users.auth?.userId

export default usersReducer
