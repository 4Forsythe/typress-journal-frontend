import { AxiosInstance } from 'axios'
import { CreatePostDto, PostParamsType, PostType, PostsType } from './types/post'

export const PostApi = (instance: AxiosInstance) => ({
  async create(dto: CreatePostDto): Promise<PostType> {
    const { data } = await instance.post('/post', dto)
    return data
  },

  async update(id: number, dto: CreatePostDto): Promise<PostType> {
    const { data } = await instance.patch(`/post/${id}`, dto)
    return data
  },

  async getAll(params?: PostParamsType): Promise<PostsType> {
    const { data } = await instance.get('/post', { params })
    return data
  },

  async getOne(id: number): Promise<PostType> {
    const { data } = await instance.get(`/post/${id}`)
    return data
  },
})
