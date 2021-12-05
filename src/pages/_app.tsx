import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AnimatePresence exitBeforeEnter>
      // router.route es lo que hace que funcione el exit del AnimatePresence
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>)
}

export default MyApp
