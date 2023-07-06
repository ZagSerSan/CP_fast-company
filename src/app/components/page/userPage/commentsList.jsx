/* eslint-disable */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// utils, css
import './commentsList.css'
// api
import commentsApi from '../../../api/fake.api/comments.api'
// components
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
      setThisUserComments(prev => ([
        ...prev,
        data
      ]))
    )
  }
  
  // sort comments
  thisUserComments.sort(function compare(a, b) {
    const dateA = new Date(Number(a.created_at))
    const dateB = new Date(Number(b.created_at))
    return dateB - dateA
  })
  
  return (
    <>
      <div className='card mb-2'>
        {' '}
        <div className='card-body '>
          <AddCommentForm onSubmit={addComment} userId={userId}/>
        </div>
      </div>

      {thisUserComments.length > 0 ? (
        <div className='card mb-3'>
          <div className='card-body '>
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
