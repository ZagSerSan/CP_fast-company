import React from 'react'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.css'
import { useSelector } from 'react-redux'
import { getQualitiesLoadingStatus, getQualitiesByIds } from '../../store/qualities'

const Qualitie = ({ qualityIds }) => {
  const userQualities = useSelector(getQualitiesByIds(qualityIds))
  const isLoading = useSelector(getQualitiesLoadingStatus())

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
