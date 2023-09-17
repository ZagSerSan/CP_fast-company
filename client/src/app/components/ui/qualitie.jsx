import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { getQualitiesLoadingStatus, getQualitiesByIds, loadQualitiesList } from '../../store/qualities'

const Qualitie = ({ qualityIds }) => {
  const dispatch = useDispatch()
  const userQualities = useSelector(getQualitiesByIds(qualityIds))
  const isLoading = useSelector(getQualitiesLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])

  return (
    <>
      {!isLoading ? (
        userQualities.map(quality => (
          <span
            key={quality._id}
            className={'badge bg-' + quality.color + ' m-1'}
          >
            {quality.name}
          </span>
        ))
      ) : 'loading...'
      }
    </>
  )
}

Qualitie.propTypes = {
  qualityIds: PropTypes.array
}

export default Qualitie
