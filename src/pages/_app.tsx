import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { JwtContextProvider } from '../context/sessionJwtContext'

type AppPropsConPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

function MyApp({ Component, pageProps, router }: AppPropsConPageLayout) {

  return (
    <AnimatePresence exitBeforeEnter>
      <JwtContextProvider>
        {
          Component.PageLayout ?
            <Component.PageLayout >
              <Component {...pageProps} key={router.route} />
            </Component.PageLayout>
            :
            <Component {...pageProps} key={router.route} />
        }
      </JwtContextProvider>
    </AnimatePresence>
  );
}

export default MyApp
