import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { orderBy } from 'lodash'
import { useComments } from '../../../hooks/useComments'
import './commentsList.css'
import Comment from './comment'
import AddCommentForm from './addCommentForm'
import { useDispatch, useSelector } from 'react-redux'
import { getComments, getCommentsLoadingStatus, loadCommentsList } from '../../../store/comments'
import IconSVG from '../../common/iconSVG'

const CommentsList = ({ userId }) => {
  const dispatch = useDispatch()
  const isLoading = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getComments())
  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const { createComment, removeComment } = useComments()

  const addComment = (commentData) => {
    createComment(commentData)
  }
  const deleteComment = (commentId) => {
    removeComment(commentId)
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
