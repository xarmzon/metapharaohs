import type { NextPage } from 'next'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Main from '../components/Main'
import NFTSwiper from '../components/NFTSwiper'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Main />
      <NFTSwiper />
      <Footer />
    </>
  )
}

export default Home
