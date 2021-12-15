import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import Layout from '../layout'
import { ProductContextProvider } from "../context/productContext";
import { ClienteContextProvider } from "../context/clientContext";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      <ProductContextProvider>
        <ClienteContextProvider>
          <Layout key={router.route}>
            {/* router.route es lo que hace que funcione el exit del AnimatePresence */}
            <Component {...pageProps} key={router.route} />
          </Layout>
        </ClienteContextProvider>
      </ProductContextProvider>
    </AnimatePresence>)
}

export default MyApp
