import React from "react"
import Qualitie from "./qualitie"
import Bookmark from "./bookmark"
import "bootstrap/dist/css/bootstrap.css"
import PropTypes from "prop-types"

const User = ({ user, onHandleDelete, onToggleBookMark }) => {
  return (
    <>
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>
          <Qualitie qualities={user.qualities} />
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate + "/5"}</td>
        <td>
          {/* <Bookmark userFromUser={user} onToggleBookMark={onToggleBookMark} /> */}
        </td>
        <td>
          <button
            onClick={() => onHandleDelete(user._id)}
            className="btn btn-danger"
          >
            delete
          </button>
        </td>
      </tr>
    </>
  )
}
User.propTypes = {
  user: PropTypes.object.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
}
export default User
