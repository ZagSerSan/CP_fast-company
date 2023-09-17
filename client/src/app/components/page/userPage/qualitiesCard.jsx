import React from 'react'
import PropTypes from 'prop-types'
import Qualitie from '../../ui/qualitie'

const QualitiesCard = ({ qualitiesIds }) => {
  return (<>
      <div className="card mb-3">
        <div className="card-body d-flex flex-column justify-content-center text-center">
          <h5 className="card-title">
            <span>Qualities</span>
          </h5>
          <div className="card-text">
            <Qualitie qualityIds={qualitiesIds}/>
          </div>
        </div>
      </div>
  </>)
}

QualitiesCard.propTypes = {
  qualitiesIds: PropTypes.array
}

export default QualitiesCard
