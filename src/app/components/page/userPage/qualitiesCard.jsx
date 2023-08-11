import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getQualitiesLoadingStatus, getQualitiesByIds } from '../../../store/qualities'

const QualitiesCard = ({ qualitiesIds }) => {
  const userQualities = useSelector(getQualitiesByIds(qualitiesIds))
  const isLoading = useSelector(getQualitiesLoadingStatus())

  return (<>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Qualities</span>
          </h5>
          <div className="card-text">
            {!isLoading ? (
              userQualities.map((item) => (
                <h4
                  key={item._id}
                  className={'badge bg-' + item?.color}
                  style={{ fontSize: '16px', margin: '5px 5px 10px 0' }}
                >
                  {item.name}
                </h4>
              ))) : 'loading...'}
          </div>
        </div>
      </div>
  </>)
}

QualitiesCard.propTypes = {
  qualitiesIds: PropTypes.array
}

export default QualitiesCard
