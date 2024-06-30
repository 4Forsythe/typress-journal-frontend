import React from 'react'
import { AppContext, AppProps } from 'next/app'
import { Noto_Sans as NotoSans, Raleway } from 'next/font/google'

import { Provider } from 'react-redux'
import { wrapper } from '@/redux/store'

import clsx from 'clsx'
import { Header } from '@/components/Header'

import { api } from '@/utils/api'
import { setUserData } from '@/redux/features/user'

import '@/styles/main.scss'

const notoSans = NotoSans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-noto-sans',
})

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-raleway',
})

const App = ({ Component, ...rest }: AppProps) => {
  const {
    store,
    props: { pageProps },
  } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <div className={clsx('h-full font-sans', notoSans.variable, raleway.variable)}>
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

App.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ ctx, Component }: AppContext) => {
      try {
        const data = await api(ctx).user.getProfile()
        store.dispatch(setUserData(data))
      } catch (error) {
        console.error(error)
      }
      return {
        pageProps: {
          ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
        },
      }
    }
)

export default App
