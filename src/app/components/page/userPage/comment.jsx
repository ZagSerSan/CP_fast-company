/* eslint-disable */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userApi from '../../../api/fake.api/user.api'

const Comment = ({commentUserId, comment}) => {
	//todo
  // получение пользователей написавших комментарии на текущей странице
  const [commentedUser, setCommentedUser] = useState()
  useEffect(() => {
    userApi.getUserById(commentUserId).then(user => setCommentedUser(user))
  }, [])

	const date = new Date(comment.created_at * 1000)
	// console.log('date', date)

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <img
							src={`https://avatars.dicebear.com/api/avataaars/${(
								Math.random() + 1
							)
								.toString(36)
								.substring(7)}.svg`}
              className="rounded-circle shadow-1-strong me-3"
              alt="avatar"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
										{commentedUser?.name}
                    <span className="small">{' - ' + date}</span>
                  </p>
                  <button className="btn btn-sm text-primary d-flex align-items-center">
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{comment.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Comment.propTypes = {
	commentUserId: PropTypes.string,
	comment: PropTypes.object
}

export default Comment
