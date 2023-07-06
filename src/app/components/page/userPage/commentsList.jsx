import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import './commentsList.css'
import commentsApi from '../../../api/fake.api/comments.api'
import Comment from './comment'
import AddCommentForm from './addCommentForm'

const CommentsList = ({ userId }) => {
  const [thisUserComments, setThisUserComments] = useState([])
  useEffect(() => {
    commentsApi.fetchCommentsForUser(userId).then(data => setThisUserComments(data))
  }, [])

  // DALETE and ADD func
  const deleteComment = (commentId) => {
    commentsApi.remove(commentId).then(
      setThisUserComments(prev => prev.filter(item => item._id !== commentId))
    )
  }
  const addComment = (commentData) => {
    commentsApi.add(commentData).then(data =>
      setThisUserComments(prev => ([...prev, data]))
    )
  }

  const sortedComments = orderBy(thisUserComments, ['created_at'], ['desc'])
  
  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <AddCommentForm onSubmit={addComment} userId={userId}/>
        </div>
      </div>

      {sortedComments.length > 0 ? (
        <div className='card mb-3'>
          <div className='card-body '>
            <h2>Comments</h2>
            <hr />
            {sortedComments.map(comment => (
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
