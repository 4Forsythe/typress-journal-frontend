import { NextPage } from 'next'
import Head from 'next/head'

import { SearchForm } from '@/components/SearchForm'
import { MainLayout } from '@/layouts/MainLayout'

const Search: NextPage = () => {
  return (
    <>
      <Head>
        <title>Typress: Поиск</title>
      </Head>
      <MainLayout size="large">
        <SearchForm />
      </MainLayout>
    </>
  )
}

export default Search
