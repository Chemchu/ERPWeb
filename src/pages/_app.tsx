import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { ProductContextProvider } from "../context/productContext";
import { ClienteContextProvider } from "../context/clientContext";
import { ProductCarritoContextProvider } from '../context/productosEnCarritoContext';

type AppPropsConPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}

function MyApp({ Component, pageProps, router }: AppPropsConPageLayout) {

  return (
    <ProductContextProvider>
      <ProductCarritoContextProvider>
        <ClienteContextProvider>
          {
            Component.PageLayout ?
              <Component.PageLayout >
                <Component {...pageProps} key={router.route} />
              </Component.PageLayout>
              :
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
          }
        </ClienteContextProvider>
      </ProductCarritoContextProvider>
    </ProductContextProvider>
  );
}

export default MyApp
