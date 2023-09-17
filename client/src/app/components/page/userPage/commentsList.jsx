import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
// css
import './commentsList.css'
// components
import Comment from './comment'
import IconSVG from '../../common/iconSVG'
import AddCommentForm from './addCommentForm'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments, getCommentsLoadingStatus, loadCommentsList, removeComment } from '../../../store/comments'
import { getCurrentUserId } from '../../../store/users'

const CommentsList = ({ userId }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())
  const currentUserId = useSelector(getCurrentUserId())

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const addComment = (commentData) => {
    dispatch(createComment({ ...commentData, pageId: userId, userId: currentUserId }))
  }
  const deleteComment = (commentId) => {
    dispatch(removeComment(commentId))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        {' '}
        <div className="card-body ">
          <AddCommentForm onSubmit={addComment} />
        </div>
      </div>

      {sortedComments.length > 0 ? (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Comments</h2>
            <hr />
            {!isLoading
              ? sortedComments.map((comment) => (
                <Comment
                    key={comment._id}
                    commentUserId={comment.userId}
                    comment={comment}
                    onDelete={deleteComment}
                  />
                ))
              : <IconSVG id='loader'/>
            }
          </div>
        </div>
      ) : null}
    </>
  )
}

CommentsList.propTypes = {
  userId: PropTypes.string
}

export default CommentsList
