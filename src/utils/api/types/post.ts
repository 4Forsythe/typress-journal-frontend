import { UserType } from './user'
import { CategoryType } from './category'

export type PostSectionType = {
  title: string
  content: string
}

export type CreatePostDto = {
  title: string
  subtitle?: string
  content: string
  category: number
  sections?: PostSectionType[]
  keywords?: string[] | string
}

export type PostParamsType = {
  query?: string
  author?: number
  category?: number
  sortBy?: 'views' | 'createdAt'
  order?: 'ASC' | 'DESC'
  skip?: number
  take?: number
}

export type PostType = {
  id: number
  title: string
  subtitle?: string
  content: string
  category: CategoryType
  sections?: PostSectionType[]
  keywords?: string[]
  views: number
  author: UserType
  totalComments: number
  createdAt: string
  updatedAt: string
}

export type PostsType = {
  items: PostType[]
  total: number
}
