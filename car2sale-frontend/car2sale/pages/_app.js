
import Layout from '../comps/Layout'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )

}

export default MyApp
