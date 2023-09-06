import { createSelector, createSlice } from '@reduxjs/toolkit'
import qualityService from '../service/qualities.service'

const qualitiesSlice = createSlice({
  name: 'qualities',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    qualitiesRequested: (state) => {
      state.isLoading = true
    },
    qualitiesReceved: (state, action) => {
      state.entities = action.payload
      state.lastFetch = Date.now()
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

function isOutdated(date) {
  if ((Date.now() - date) > (10 * 60 * 100)) {
    return true
  } else {
    return false
  }
}

export const loadQualitiesList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().qualities
  if (isOutdated(lastFetch)) {
    dispatch(qualitiesRequested())
    try {
      const { content } = await qualityService.get()
      dispatch(qualitiesReceved(content))
    } catch (error) {
      dispatch(qualitiesRequestFiled(error.message))
    }
  }
}

export const getQualities = () => (state) => state.qualities.entities
export const getQualitiesLoadingStatus = () => (state) => state.qualities.isLoading
export const getQualitiesByIds = (qualitiesIds) => createSelector(
  state => state.qualities.entities,
  (state) => qualitiesIds.map(qualId => state.find(qual => qual._id === qualId))
)

export default qualitiesReducer
