import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import professionService from '../service/profession.service'

const ProfessionContext = React.createContext()
export const useProfession = () => {
  return useContext(ProfessionContext)
}

export const ProfessionProvider = ({children}) => {
  const [isLoading, setLoading] = useState(true)
  const [professions, setProfessions] = useState([])
  const [error, setError] = useState(null)

  // вызов getProfessions() при монтировании компонента
  useEffect(() => {
    getProfessions()
  }, [])
  // обработка/показ ошибки пользователю
  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])
  const errorCatcher = (error) => {
    const {message} = error.response.data
    setError(message)
  }
  async function getProfessions() {
    try {
      const {content} = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
 
  return (
    <ProfessionContext.Provider value={{isLoading, professions, setProfessions}}>
      {children}
    </ProfessionContext.Provider>
  )
}

ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node), 
    PropTypes.node
  ])
}
