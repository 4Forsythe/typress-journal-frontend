import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Post } from '@/components/pages/Post'
import { MainLayout } from '@/layouts/MainLayout'

import { api } from '@/utils/api'
import { PostType } from '@/utils/api/types/post'

interface NewsPageProps {
  post: PostType
}

const News: NextPage<NewsPageProps> = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <MainLayout size="large">
        <Post post={post} />
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const id = ctx.params?.id as string
    const post = await api(ctx).post.getOne(+id)
    return {
      props: {
        post,
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

export default News
