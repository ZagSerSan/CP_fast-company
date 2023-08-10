import { createSlice } from '@reduxjs/toolkit'
import qualityService from '../service/qualities.service'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entitites: null,
    isLoading: true,
    error: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entitites = action.payload
      state.isLoading = false
    },
    qualitiesRequestFiled: (state, action) => {
      state.error = action.payload 
      state.isLoading = false
    }
  }
})

const { reducer: qualitiesReducer, actions } = qualitiesSlice
const { qualitiesRequested, qualitiesReceved, qualitiesRequestFiled } = actions

export const loadQualitiesList = () => async (dispatch) => {
  dispatch(qualitiesRequested())
  try {
    const { content } = await qualityService.get()
    dispatch(qualitiesReceved(content))
  } catch (error) {
    dispatch(qualitiesRequestFiled(error.message))
  }
}

export default qualitiesReducer
