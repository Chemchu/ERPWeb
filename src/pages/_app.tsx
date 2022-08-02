import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { DatosTiendaContextProvider } from '../context/datosTienda'

type AppPropsConPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: any
  }
}

function MyApp({ Component, pageProps, router }: AppPropsConPageLayout) {
  return (
    <AnimatePresence exitBeforeEnter>
      {
        Component.PageLayout ?
          <DatosTiendaContextProvider >
            <Component.PageLayout >
              <Component {...pageProps} key={router.route} />
            </Component.PageLayout>
          </DatosTiendaContextProvider>
          :
          <Component {...pageProps} key={router.route} />
      }
    </AnimatePresence>
  );
}

export default MyApp
