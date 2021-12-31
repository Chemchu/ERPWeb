import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { SessionProvider } from "next-auth/react"
import React from 'react'

type AppPropsConPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

function MyApp({ Component, pageProps, router }: AppPropsConPageLayout) {

  return (
    <SessionProvider session={pageProps.session}>
      <AnimatePresence exitBeforeEnter>
        {
          Component.PageLayout ?
            <Component.PageLayout >
              <Component {...pageProps} key={router.route} />
            </Component.PageLayout>
            :
            <Component {...pageProps} key={router.route} />
        }
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp
