import { ChakraProvider } from "@chakra-ui/react"
import theme from '../lib/theme'
import Layout from '../components/layout/mainLayout'
import { SessionProvider } from 'next-auth/react'
import { AnimatePresence } from "framer-motion"

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AnimatePresence exitBeforeEnter initial={true}>
          <Layout>
            <Component {...pageProps} key={router.route} router={router} />
          </Layout>
        </AnimatePresence>
      </ChakraProvider >
    </SessionProvider>
  )


}

export default MyApp
