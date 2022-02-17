import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { envInformation } from '../utils/envInfo';

type AppPropsConPageLayout = AppProps & {
  Component: AppProps['Component'] & {
    PageLayout?: React.ComponentType
  }
}


const client = new ApolloClient({
  uri: process.env.ERPBACK_URL,
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps, router }: AppPropsConPageLayout) {

  return (
    <AnimatePresence exitBeforeEnter>
      <ApolloProvider client={client}>
        {
          Component.PageLayout ?
            <Component.PageLayout >
              <Component {...pageProps} key={router.route} />
            </Component.PageLayout>
            :
            <Component {...pageProps} key={router.route} />
        }
      </ApolloProvider>
    </AnimatePresence>
  );
}

export default MyApp
