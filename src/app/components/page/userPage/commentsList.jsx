/* eslint-disable */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// utils, css
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
import './commentsList.css'
// api
import commentsApi from '../../../api/fake.api/comments.api'
import userApi from '../../../api/fake.api/user.api'
// components
import Comment from './comment'

const CommentsList = ({ userId }) => {
  const [isBlured, setIsBlured] = useState(false)
  const [thisUserComments, setThisUserComments] = useState([])
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})
  const [commentData, setCommentData] = useState(
    {
      pageId: userId,
      userId: '',
      content: '',
    }
  )

  useEffect(() => {
    commentsApi.fetchCommentsForUser(userId).then(data => setThisUserComments(data))
    userApi.fetchAll().then(data => setUsers(data))
  }, [])

  // DALETE and ADD func
  const deleteComment = (commentId) => {
    commentsApi.remove(commentId).then(
      setThisUserComments(prev => prev.filter(item => item._id !== commentId))
    )
  }
  const handleData = ({target}) => {
    setCommentData(prev => (
      {
        ...prev,
        [target.name]: target.value
      }
    ))
    setIsBlured(true)
    validate()
  }
  const addComment = (e) => {
    e.preventDefault()
    setIsBlured(true)

    const ifValid = validate()
    if (!ifValid) return

    commentsApi.add(commentData).then(data =>
      setThisUserComments(prev => ([
        ...prev,
        data
      ]))
    )
  }

  useEffect(() => {
    validate()
  }, [commentData])
  
  const validate = () => {
    const errors = validator(commentData, validatorConfig)
    setErrors(errors)

    return Object.keys(errors).length === 0
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
          <form>
            <div className="form-group mb-3">
              <label htmlFor="new-comment-input-1">New comment</label>
              <select
                className={
                  'form-select' + (!isBlured ? '' : errors.userId ? ' is-invalid' : ' is-valid')
                }
                name='userId'
                onChange={handleData}
                id="new-comment-input-1"
                value={commentData.userId}
              >
                <option disabled value=''>
                  Выберите пользователя
                </option>
                {users && users.map(user => (
                  <option value={user._id} key={user._id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="new-comment-textarea-1">Сообщение</label>
              <textarea
                name='content'
                className={
                  'form-control' + (!isBlured ? '' : errors.content ? ' is-invalid' : ' is-valid')
                }
                id="new-comment-textarea-1"
                onChange={handleData}
                value={commentData.content}
              ></textarea>
            </div>
            <button type="submit" onClick={addComment} className="btn btn-primary">Submit</button>
          </form>
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
