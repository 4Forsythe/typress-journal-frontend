import Head from 'next/head'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Flows } from '@/components/pages/Flows'
import { MainLayout } from '@/layouts/MainLayout'

import { api } from '@/utils/api'
import { CategoriesType } from '@/utils/api/types/category'

interface FlowsPageProps {
  categories: CategoriesType
}

const FlowsPage: NextPage<FlowsPageProps> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Typress: Потоки</title>
      </Head>
      <MainLayout size="small">
        <Flows categories={categories} />
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const categories = await api().category.getAll()
    return {
      props: {
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

export default FlowsPage
