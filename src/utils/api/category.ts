import { AxiosInstance } from 'axios'
import { CategoriesType, CategoryParamsType, CategoryType } from './types/category'

export const CategoryApi = (instance: AxiosInstance) => ({
  async getAll(params?: CategoryParamsType): Promise<CategoriesType> {
    const { data } = await instance.get('/category', { params })
    return data
  },

  async getOne(id: number): Promise<CategoryType> {
    const { data } = await instance.get(`/category/${id}`)
    return data
  },
})
