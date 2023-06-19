import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
// utils, css
import './form.module.css'
import professionsApi from '../../api/fake.api/professions.api'
import qualitiesApi from '../../api/fake.api/qualities.api'
import { validator } from '../../utils/validator'
import { validatorConfig } from '../../utils/validatorConfig'
// components
import TextField from '../common/form/textField'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'
import CheckBoxField from '../common/form/checkBoxField'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const RegisterForm = () => {
  // состояние ошибок для валидации форм + validate()
  const [errors, setErrors] = useState({})
  // значение полей формы
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })

  // all api qualities state
  const history = useHistory()
  const [qualities, setQualities] = useState([])

  useEffect(() => {
    qualitiesApi.fetchAll().then((data) => {
      const qualitiesList = Object.keys(data).map((qualitieName) => ({
        label: data[qualitieName].name,
        value: data[qualitieName]._id
      }))
      setQualities(qualitiesList)
    })

    professionsApi.fetchAll().then((data) => {
      const professionsList = Object.keys(data).map((professionName) => ({
        label: data[professionName].name,
        value: data[professionName]._id
      }))
      setProfession(professionsList)
    })
  }, [])

  // for SelectField
  const [professions, setProfession] = useState()

  // handleChange => onChange в дочерних компонентах (полях)
  const handleChange = (fieldData) => {
    setData((prevState) => ({
      ...prevState,
      [fieldData.name]: fieldData.value
    }))
  }

  // действие кнопки отправить если формы валидны
  const getProfessionById = (id) => {
    for (const prof of professions) {
      if (prof.value === id) {
        return { _id: prof.value, name: prof.label }
      }
    }
  }
  const getQualities = (elements) => {
    const qualitiesArray = []
    for (const elem of elements) {
      for (const quality in qualities) {
        if (elem.value === qualities[quality].value) {
          qualitiesArray.push({
            _id: qualities[quality].value,
            name: qualities[quality].label,
            color: qualities[quality].color
          })
        }
      }
    }
    return qualitiesArray
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    const ifValid = validate()
    if (!ifValid) return

    // действие кнопки отправить если формы валидны
    const { profession, qualities } = data
    console.log({
      ...data,
      professions: getProfessionById(profession),
      qualities: getQualities(qualities)
    })
    history.push('/Users')
  }

  useEffect(() => {
    validate()
  }, [data])
  const validate = () => {
    const errors = validator(data, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  // блокировка кнопки
  const isValid = Object.keys(errors).length === 0

  return (
    <>
      <h2>Registration</h2>
      <form className="form" onSubmit={handleSubmit}>
        <TextField
          label="Login/mail:"
          name="email"
          value={data.mail}
          onChange={handleChange}
          errors={errors}
        />
        <TextField
          label="Password:"
          name="password"
          value={data.password}
          type="password"
          onChange={handleChange}
          errors={errors}
        />
        <SelectField
          name="profession"
          label="Your profession:"
          defaultOption="Choose your profession..."
          value={data.profession}
          professions={professions}
          error={errors.profession}
          onChange={handleChange}
        />
        <RadioField
          options={[
            { name: 'Male', value: 'male' },
            { name: 'Female', value: 'female' },
            { name: 'Other', value: 'other' }
          ]}
          value={data.sex}
          name="sex"
          onChange={handleChange}
        />
        <MultiSelectField
          name="qualities"
          label="Choose your qualities:"
          defaultValue={data.qualities}
          qualities={qualities}
          onChange={handleChange}
        />
        <CheckBoxField
          value={data.licence}
          onChange={handleChange}
          name="licence"
          error={errors.licence}
        >
          Confirm the <a href="">license agreement</a>.
        </CheckBoxField>
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-primary w-100 mx-auto"
        >
          Register
        </button>
        <p className="mt-2">
          If you have account, please <Link to="/Login">Sign in</Link>
        </p>
      </form>
    </>
  )
}

export default RegisterForm
