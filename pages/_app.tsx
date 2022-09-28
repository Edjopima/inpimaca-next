import { AppProps } from 'next/app'
import Head  from 'next/head'
import Layout from '../components/layout/index'
import { ContextProvider } from '../context/context'
import '../global.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
      <Layout>
        <Head>
          <title>Inpimaca</title>
        </Head>
          <Component {...pageProps} />
      </Layout>
    </ContextProvider>
  )
}

export default MyApp
