import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { Flow } from '@/components/pages/Flow'
import { MainLayout } from '@/layouts/MainLayout'

import { api } from '@/utils/api'
import { PostsType } from '@/utils/api/types/post'
import { CategoriesType, CategoryType } from '@/utils/api/types/category'

interface FlowPageProps {
  category: CategoryType
  posts: PostsType
  categories: CategoriesType
}

const FlowPage: NextPage<FlowPageProps> = ({ category, posts, categories }) => {
  return (
    <>
      <Head>
        <title>{category.title}</title>
      </Head>
      <MainLayout>
        <Flow category={category} posts={posts} categories={categories} />
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const id = ctx.params?.id as string
    const category = await api().category.getOne(+id)
    const posts = await api().post.getAll({ category: category.id })
    const categories = await api().category.getAll({ sortBy: 'random', take: 5 })
    return {
      props: {
        category,
        posts,
        categories,
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

export default FlowPage
