import Head from 'next/head'
import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'

import { Profile } from '@/components/pages/Profile'
import { MainLayout } from '@/layouts/MainLayout'

import { api } from '@/utils/api'
import { UserType } from '@/utils/api/types/user'

interface UserPageProps {
  user: UserType
}

const UserPage: NextPage<UserPageProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>{user.username}</title>
      </Head>
      <MainLayout size="small">
        <Profile user={user} />
      </MainLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    const id = ctx.query.id as string
    const user = await api().user.getOne(+id)

    if (user) {
      return {
        props: {
          user,
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

export default UserPage
