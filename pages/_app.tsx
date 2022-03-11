import '../styles/globals.css'
import 'aos/dist/aos.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { useEffect } from 'react'
import aos from 'aos'
import { Toaster } from 'react-hot-toast'
import { DEFAULT_SEO } from '../utils/constants'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    aos.init()

    window.addEventListener('load', aos.refresh)
  }, [])
  return (
    <div className="min-h-screen min-w-full bg-gradient-to-b from-primary/90 to-primary-500/60">
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
      <Toaster />
    </div>
  )
}

export default MyApp
