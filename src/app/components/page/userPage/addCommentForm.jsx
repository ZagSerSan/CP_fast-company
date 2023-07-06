import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userApi from '../../../api/fake.api/user.api'
// import { validator } from '../../../utils/validator'
// import { validatorConfig } from '../../../utils/validatorConfig'

const AddCommentForm = ({ userId, onSubmit }) => {
  const [users, setUsers] = useState()
  // const [errors, setErrors] = useState({})
  // const [isBlured, setIsBlured] = useState(false)
  const [commentData, setCommentData] = useState({
    pageId: userId,
    userId: '',
    content: ''
  })
  useEffect(() => {
    userApi.fetchAll().then(data => setUsers(data))
  }, [])

  const handleChange = ({target}) => {
    setCommentData(prev => ({
      ...prev,
      [target.name]: target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(commentData)
  }

  // useEffect(() => {
  //   validate()
  // }, [commentData])

  // const validate = () => {
  //   const errors = validator(commentData, validatorConfig)
  //   setErrors(errors)

  //   return Object.keys(errors).length === 0
  // }

  return (
    <form>
      <div className="form-group mb-3">
        <label htmlFor="new-comment-input-1">New comment</label>
        <select
          // className={
          //   'form-select' + (!isBlured ? '' : errors.userId ? ' is-invalid' : ' is-valid')
          // }
          className='form-select'
          name='userId'
          onChange={handleChange}
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
          // className={
          //   'form-control' + (!isBlured ? '' : errors.content ? ' is-invalid' : ' is-valid')
          // }
          className='form-select'
          id="new-comment-textarea-1"
          onChange={handleChange}
          value={commentData.content}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">Опубликовать</button>
    </form>
  )
}

AddCommentForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default AddCommentForm
