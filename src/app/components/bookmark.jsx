import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from "prop-types"

const Bookmark = ({ user, onToggleBookMark }) => {
  return (
    <>
      <button
        style={{ border: "none", backgroundColor: "transparent" }}
        onClick={() => onToggleBookMark(user._id)}
      >
        {user.bookmark ? (
          <i
            style={{ fontSize: "20px" }}
            className="bi bi-bookmark-star-fill"
          ></i>
        ) : (
          <i style={{ fontSize: "20px" }} className="bi bi-bookmark"></i>
        )}
      </button>
    </>
  )
}
Bookmark.propTypes = {
  user: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
}
export default Bookmark
