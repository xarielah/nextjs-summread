import { ChakraProvider } from "@chakra-ui/react"
import theme from '../lib/theme'
import Layout from '../components/layout/mainLayout'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps }, router }) {

  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} key={router.route} router={router} />
        </Layout>
      </ChakraProvider >
    </SessionProvider>
  )


}

// MyApp.getInitialProps = async (appContext) => {
//   const { token } = appContext.ctx.req.cookies
//   let user
//   try {
//     const payload = verify(token, process.env.JWT_KEY)
//     user = payload
//   } catch (error) {
//     user = {}
//   }

//   const appProps = await App.getInitialProps(appContext);
//   console.log(appProps)

//   return { user }
// }

export default MyApp
