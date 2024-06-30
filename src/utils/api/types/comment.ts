import { UserType } from './user'
import { PostType } from './post'

export type CreateCommentDto = {
  commentId?: number
  content: string
  postId: number
}

export type CommentParamsType = {
  query?: string
  post?: number
  user?: number
  order?: 'ASC' | 'DESC'
  skip?: number
  take?: number
}

export type CommentType = {
  id: number
  content: string
  post?: PostType
  user?: UserType
  createdAt: string
  updatedAt: string
}

export type CommentsType = {
  items: CommentType[]
  total: number
}
