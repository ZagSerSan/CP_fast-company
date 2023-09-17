import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import IconSVG from '../../common/iconSVG'
// store
import { loadProfessionsList, loadQualitiesList, loadUsersList } from '../../../store'
import { getIsLoggedIn, getUsersLoadingStatus } from '../../../store/users'
import { getQualitiesLoadingStatus } from '../../../store/qualities'
import { getProfessionsLoadingStatus } from '../../../store/professions'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())

  const qualitiesLoadingStatus = useSelector(getQualitiesLoadingStatus())
  const pofessionsLoadingStatus = useSelector(getProfessionsLoadingStatus())
  const usersStatusLoading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])

  if (qualitiesLoadingStatus || pofessionsLoadingStatus || usersStatusLoading) return <IconSVG id='loader'/>
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AppLoader
