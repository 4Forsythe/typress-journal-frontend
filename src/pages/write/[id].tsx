import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { WriteForm } from '@/components/WriteForm'
import { MainLayout } from '@/layouts/MainLayout'

import { api } from '@/utils/api'
import { PostType } from '@/utils/api/types/post'
import { CategoriesType } from '@/utils/api/types/category'

interface WritePageProps {
  post: PostType
  categories: CategoriesType
}

const Write: NextPage<WritePageProps> = ({ post, categories }) => {
  return (
    <>
      <Head>
        <title>Редактировать статью</title>
      </Head>
      <MainLayout size="large">
        <WriteForm post={post} categories={categories} />
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const id = ctx.query.id as string
    const user = await api(ctx).user.getProfile()
    const categories = await api().category.getAll()
    const post = await api().post.getOne(+id)

    if (post.author.id === user.id) {
      return {
        props: {
          post,
          categories,
        },
      }
    }

    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
}

export default Write
