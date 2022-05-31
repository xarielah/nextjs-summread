import { ChakraProvider } from "@chakra-ui/react"
import theme from '../lib/theme'
import Layout from '../components/layout/mainLayout'

function MyApp({ Component, pageProps, router }) {
  return (
    <Layout>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} key={router.route} router={router} />
      </ChakraProvider>
    </Layout>
  )
}

export default MyApp
