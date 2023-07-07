import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userApi from '../../../api/fake.api/user.api'
import { validator } from '../../../utils/validator'
import { validatorConfig } from '../../../utils/validatorConfig'
import { toast } from 'react-toastify'
// import SelectField from '../../common/form/selectField'

const AddCommentForm = ({ userId, onSubmit }) => {
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})
  const [isBlured, setIsBlured] = useState(false)
  const initialState = {
    pageId: userId,
    userId: '',
    content: ''
  }
  const [commentData, setCommentData] = useState(initialState)
  useEffect(() => {
    userApi.fetchAll().then((data) => setUsers(data))
  }, [])

  const handleChange = ({ target }) => {
    setCommentData((prev) => ({
      ...prev,
      [target.name]: target.value
    }))
    setIsBlured(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      toast.info('Комметнарий не может быть пустым.')
      return setIsBlured(true)
    }
    onSubmit(commentData)
    setCommentData(initialState)
    setIsBlured(false)
  }

  useEffect(() => {
    validate()
  }, [commentData])

  const validate = () => {
    const errors = validator(commentData, validatorConfig)
    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  return (
    <form>
      <div className="form-group mb-3">
        {/* <SelectField
          name="userId"
          label="New comment:"
          defaultOption="Выберите пользователя..."
          value={commentData.userId}
          id='new-comment-input-1'
          professions={users}
          error={errors.name}
          onChange={handleChange}
        /> */}
        <label htmlFor="new-comment-input-1">New comment</label>
        <select
          className={
            'form-select' +
            (!isBlured ? '' : errors.userId ? ' is-invalid' : ' is-valid')
          }
          name="userId"
          onChange={handleChange}
          id="new-comment-input-1"
          value={commentData.userId}
        >
          <option disabled value="">
            Выберите пользователя
          </option>
          {users &&
            users.map((user) => (
              <option value={user._id} key={user._id}>
                {user.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="new-comment-textarea-1">Сообщение</label>
        <textarea
          name="content"
          className={
            'form-control' +
            (!isBlured ? '' : errors.content ? ' is-invalid' : ' is-valid')
          }
          id="new-comment-textarea-1"
          onChange={handleChange}
          value={commentData.content}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary">
        Опубликовать
      </button>
    </form>
  )
}

AddCommentForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func
}

export default AddCommentForm
