import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getProfessionById, getProfessionsLoadingStatus } from '../../store/professions'

const Profession = ({ id }) => {
  const isLoading = useSelector(getProfessionsLoadingStatus())
  const profession = useSelector(getProfessionById(id))

  return <span>{!isLoading ? profession.name : 'loading...'}</span>
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
