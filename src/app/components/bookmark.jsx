import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from "prop-types"

const Bookmark = ({ userFromUser, onToggleBookMark }) => {
  return (
    <>
      <button
        style={{ border: "none", backgroundColor: "transparent" }}
        onClick={() => onToggleBookMark(userFromUser._id)}
      >
        {userFromUser.bookmark ? (
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
  userFromUser: PropTypes.string.isRequired,
  onToggleBookMark: PropTypes.string.isRequired
}
export default Bookmark
