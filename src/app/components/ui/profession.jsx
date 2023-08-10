import React from 'react'
import PropTypes from 'prop-types'
import { useProfession } from '../../hooks/useProfession'

const Profession = ({ id }) => {
  const { isLoading, getProfession } = useProfession()
  const prof = getProfession(id)
  // console.log(prof)
  return <span>{!isLoading ? prof.name : 'loading...'}</span>
}

Profession.propTypes = {
  id: PropTypes.string
}

export default Profession
