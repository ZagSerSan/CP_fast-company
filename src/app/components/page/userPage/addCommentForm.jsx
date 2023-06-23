import React from 'react'
import PropTypes from 'prop-types'

const AddCommentForm = ({ users, addComment, isBlured, setIsBlured, errors, commentData, setCommentData }) => {
  const handleData = ({target}) => {
    setCommentData(prev => (
      {
        ...prev,
        [target.name]: target.value
      }
    ))
    setIsBlured(true)
  }

  return (
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
      <button type="submit" onClick={addComment} className="btn btn-primary">Опубликовать</button>
    </form>
  )
}

AddCommentForm.propTypes = {
  userId: PropTypes.string.isRequired,
  addComment: PropTypes.func,
  isBlured: PropTypes.bool,
  setIsBlured: PropTypes.func,
  errors: PropTypes.object,
  commentData: PropTypes.object,
  setCommentData: PropTypes.func,
  users: PropTypes.array
}

export default AddCommentForm
