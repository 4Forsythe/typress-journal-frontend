import { GetServerSidePropsContext, NextPageContext } from 'next'

import axios from 'axios'
import Cookies, { parseCookies } from 'nookies'

import { UserApi } from './user'
import { PostApi } from './post'
import { CommentApi } from './comment'
import { CategoryApi } from './category'

export type ApiReturnType = {
  user: ReturnType<typeof UserApi>
  post: ReturnType<typeof PostApi>
  comment: ReturnType<typeof CommentApi>
  category: ReturnType<typeof CategoryApi>
}

export const api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiReturnType => {
  const cookies = ctx ? Cookies.get(ctx) : parseCookies()
  const token = cookies.token

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    user: UserApi(instance),
    post: PostApi(instance),
    comment: CommentApi(instance),
    category: CategoryApi(instance),
  }
}
