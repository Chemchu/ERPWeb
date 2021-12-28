import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

type AppPropsConPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

function MyApp({ Component, pageProps, router }: AppPropsConPageLayout) {

  if (Component.PageLayout) {
    return (
      <Component.PageLayout >
        <Component {...pageProps} key={router.route} />
      </Component.PageLayout>);
  }
  else {
    return (
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    );
  }
}

export default MyApp
