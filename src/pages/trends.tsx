import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { SideFeatures } from '@/components/SideFeatures'
import { MiniPostCard } from '@/components/MiniPostCard/indext'
import { MainLayout } from '@/layouts/MainLayout'
import { Content, ContentLayout, Sidebar } from '@/layouts/ContentLayout'

import { api } from '@/utils/api'
import { PostsType } from '@/utils/api/types/post'
import { CategoriesType } from '@/utils/api/types/category'

interface TrendsPageProps {
  posts: PostsType
  categories: CategoriesType
}

const Trends: NextPage<TrendsPageProps> = ({ posts, categories }) => {
  return (
    <>
      <Head>
        <title>Typress: Тренды</title>
      </Head>
      <MainLayout>
        <ContentLayout>
          <>
            <Content>
              <div className="gap-5 grid grid-cols-2">
                {posts.items.map((post) => (
                  <MiniPostCard key={post.id} post={post} />
                ))}
              </div>
            </Content>
            <Sidebar>
              <SideFeatures title="Расскажите нам" items={categories.items} />
            </Sidebar>
          </>
        </ContentLayout>
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const posts = await api().post.getAll({ sortBy: 'views' })
    const categories = await api().category.getAll({ sortBy: 'random', take: 5 })
    return {
      props: {
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

export default Trends
