import { createSlice } from '@reduxjs/toolkit'
import userService from '../service/users.service'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
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
    }
  }
})

const { reducer: usersReducer, actions } = usersSlice
const { usersRequested, usersReceved, usersRequestFiled } = actions

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
export const getUsersLoadingStatus = () => (state) => state.users.isLoading
// export const getUsersByIds = (usersIds) => createSelector(
//   state => state.users.entities,
//   (state) => usersIds.map(qualId => state.find(qual => qual._id === qualId))
// )

export default usersReducer
