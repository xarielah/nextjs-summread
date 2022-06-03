import { ChakraProvider } from "@chakra-ui/react"
import theme from '../lib/theme'
import Layout from '../components/layout/mainLayout'

function MyApp({ Component, pageProps, router }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} key={router.route} router={router} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp
