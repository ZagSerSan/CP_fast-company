import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from "prop-types"

const SearchStatus = ({ users }) => {
  const handlePhrase = (number) => {
    return number !== 0 ? (
      <h1 style={{ fontSize: "24px" }} className="badge bg-primary m-1">
        {number} человек тусанет с тобой сегодня
      </h1>
    ) : (
      <h1 style={{ fontSize: "24px" }} className="badge bg-danger m-1">
        Hикто не тусанет с тобой сегодня
      </h1>
    )
  }

  return <>{handlePhrase(users.length)}</>
}
SearchStatus.propTypes = {
  users: PropTypes.array.isRequired
}
export default SearchStatus
