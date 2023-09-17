import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataStatus, loadUsersList } from '../../../store/users'
import PropTypes from 'prop-types'
import IconSVG from '../../common/iconSVG'

const UsersLoader = ({ children }) => {
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])

  if (!dataStatus) return <IconSVG id={'loader'}/>
  return children
}

UsersLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UsersLoader
