import { AxiosInstance } from 'axios'
import { CommentParamsType, CommentType, CommentsType, CreateCommentDto } from './types/comment'

export const CommentApi = (instance: AxiosInstance) => ({
  async create(dto: CreateCommentDto): Promise<CommentType> {
    const { data } = await instance.post('/comment', dto)
    return data
  },

  async update(id: number, dto: CreateCommentDto): Promise<CommentType> {
    const { data } = await instance.patch(`/comment/${id}`, dto)
    return data
  },

  async remove(id: number): Promise<CommentType> {
    return await instance.delete(`/comment/${id}`)
  },

  async getAll(params?: CommentParamsType): Promise<CommentsType> {
    const { data } = await instance.get('/comment', { params })
    return data
  },
})
