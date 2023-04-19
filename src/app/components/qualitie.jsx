import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from "prop-types"

const Qualitie = ({ qualities }) => {
  return (
    <>
      {qualities.map((quality) => (
        <span
          key={quality._id}
          className={"badge bg-" + quality.color + " m-1"}
        >
          {quality.name}
        </span>
      ))}
    </>
  )
}
Qualitie.propTypes = {
  qualities: PropTypes.array.isRequired
}
export default Qualitie
