/* eslint-disableX */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// api
import commentsApi from '../../../api/fake.api/comments.api'
// components
import Comment from './comment'

const CommentsList = ({ userId }) => {
  const [thisUserComments, setThisUserComments] = useState([])
  useEffect(() => {
    commentsApi.fetchCommentsForUser(userId).then(data => setThisUserComments(data))
  }, [])

  const deleteComment = (commentId) => {
    commentsApi.remove(commentId).then(
      setThisUserComments(prev => prev.filter(item => item._id !== commentId))
    )
  }

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">(add comment)</div>
      </div>
      {thisUserComments.length > 0 ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {thisUserComments.map(comment => (
              <Comment
                key={comment._id}
                commentUserId={comment.userId}
                comment={comment}
                onDelete={deleteComment}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}

CommentsList.propTypes = {
  userId: PropTypes.string.isRequired
}

export default CommentsList
