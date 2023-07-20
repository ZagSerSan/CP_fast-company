import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { nanoid } from 'nanoid'
// import { toast } from 'react-toastify'

const CommentsContext = React.createContext()
export const useComments = () => {
  return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
  // const [isLoading, setLoading] = useState(true)
  const [comments, setComments] = useState([])
  const { userId } = useParams()
  const { currentUser } = useAuth()

  // const [error, setError] = useState(null)
  useEffect(() => {
    setComments(null)
  }, [])
  
  const createComment = (data) => {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUser._id,
      created_at: Date.now()
    }
    console.log(comment)
  }

  return (
    <CommentsContext.Provider
      value={{comments, createComment}}
    >
      {children}
    </CommentsContext.Provider>
  )
}

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default CommentsProvider
