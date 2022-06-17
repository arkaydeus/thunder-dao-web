import '../styles/globals.css'
import { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext'
import { NftfiProvider } from '../context/NftfiContext'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <NftfiProvider>
        <Component {...pageProps} />
      </NftfiProvider>
    </AuthProvider>
  )
}

export default MyApp
