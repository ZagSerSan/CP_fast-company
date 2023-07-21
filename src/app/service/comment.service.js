import httpService from './http.service'

const commentEndpoint = 'comment/'

const сommentService = {
  createComment: async (payload) => {
    const {data} = await httpService.put(commentEndpoint + payload._id, payload)
    return data
  }
}

export default сommentService
