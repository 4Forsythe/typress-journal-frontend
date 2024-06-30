import { AxiosInstance } from 'axios'
import { LoginUserDto, RegisterUserDto, UserType } from './types/user'

export const UserApi = (instance: AxiosInstance) => ({
  async getProfile(): Promise<UserType> {
    const { data } = await instance.get('/user/me')
    return data
  },

  async getOne(id: number): Promise<UserType> {
    const { data } = await instance.get(`/user/${id}`)
    return data
  },

  async login(dto: LoginUserDto): Promise<UserType> {
    const { data } = await instance.post('/auth/login', dto)
    return data
  },

  async register(dto: RegisterUserDto): Promise<UserType> {
    const { data } = await instance.post('/auth/register', dto)
    return data
  },
})
