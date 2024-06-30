export type LoginUserDto = {
  email: string
  password: string
}

export type RegisterUserDto = {
  username: string
  email: string
  password: string
}

export type UserType = {
  id: number
  username: string
  email: string
  password: string
  createdAt: string
  updatedAt: string
  totalPosts: number
  totalComments: number
  token: string
}
