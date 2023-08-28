import { createSlice } from '@reduxjs/toolkit'
import CommentService from '../service/comment.service'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: null,
    isLoading: true,
    error: null
  },
  reducers: {
    commentsRequested: (state) => {
      state.isLoading = true
    },
    commentsReceved: (state, action) => {
      state.entities = action.payload
      state.isLoading = false
    },
    commentsRequestFiled: (state, action) => {
      state.error = action.payload 
      state.isLoading = false
    },
    commentCreated: (state, action) => {
      state.entities = [...state.entities, action.payload]
      toast.success('Комментарий добавлен')
    },
    commentCreateFiled: (state, action) => {
      state.error = action.payload
      toast.error(state.error)
    },
    commentDeleted: (state, action) => {
      state.entities = state.entities.filter(comment => comment._id !== action.payload) 
      toast.success('Комментарий удалён')
    },
    commentDeleteFiled: (state, action) => {
      state.error = action.payload
      toast.error(state.error)
    }
  }
})

const { reducer: commentsReducer, actions } = commentsSlice
const { commentsRequested, commentsReceved, commentsRequestFiled, commentCreated, commentDeleted, commentDeleteFiled, commentCreateFiled } = actions

export const removeComment = (commentId) => async (dispatch) => {
  try {
    await CommentService.deleteComment(commentId)
    dispatch(commentDeleted(commentId))
  } catch (error) {
    dispatch(commentDeleteFiled(error.response.data.error))
  }
}

export const createComment = (data, userId, currentUserId) => async (dispatch) => {
  const comment = {
    ...data,
    _id: nanoid(),
    pageId: userId,
    userId: currentUserId,
    created_at: Date.now()
  }
  try {
    await CommentService.createComment(comment)
    dispatch(commentCreated(comment))
  } catch (error) {
    dispatch(commentCreateFiled(error.response.data.error))
  }
}

export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsRequested())
  try {
    const { content } = await CommentService.getComments(userId)
    dispatch(commentsReceved(content))
  } catch (error) {
    dispatch(commentsRequestFiled(error.message))
  }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) => state.comments.isLoading

export default commentsReducer
