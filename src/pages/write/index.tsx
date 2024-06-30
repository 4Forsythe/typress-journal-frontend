import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import { WriteForm } from '@/components/WriteForm'
import { MainLayout } from '@/layouts/MainLayout'

import { api } from '@/utils/api'
import { CategoriesType } from '@/utils/api/types/category'

interface WritePageProps {
  categories: CategoriesType
}

const Write: NextPage<WritePageProps> = ({ categories }) => {
  return (
    <>
      <Head>
        <title>Написать статью</title>
      </Head>
      <MainLayout size="large">
        <WriteForm categories={categories} />
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

export default Write
