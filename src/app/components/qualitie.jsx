import React from "react"
import "bootstrap/dist/css/bootstrap.css"

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

export default Qualitie
