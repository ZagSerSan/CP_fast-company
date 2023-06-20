/* eslint-disable */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// api
import commentsApi from '../../../api/fake.api/comments.api'
// components
import Comment from './comment'

const CommentsList = ({ userId }) => {
  const [thisUserComments, setThisUserComments] = useState()
  useEffect(() => {
    commentsApi.fetchCommentsForUser(userId).then(data => setThisUserComments(data))
  }, [])
  // console.log('thisUserComments', thisUserComments)

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">(add comment)</div>
      </div>
      {thisUserComments && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {thisUserComments.map(comment => (
              <Comment
                key={comment._id}
                commentUserId={comment.userId}
                comment={comment}  
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

CommentsList.propTypes = {
  userId: PropTypes.string.isRequired
}

export default CommentsList
