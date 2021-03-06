import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import ConsoleStats from '../components/ConsoleStats'
import Layout from '../components/Layout'
import { Loan } from '../models/Loan'

const Home: NextPage = () => {
  const [loans, setLoans] = useState<Loan[]>([])

  useEffect(() => {
    const getLoans = async () => {
      const response = await fetch(
        'https://api.nftfi.com/loans/history/0x82c66866043593fc59b4e6630b4455780fa89e2c'
      )
      const data: [] = await response.json()
      if (data) {
        setLoans(data)
      }
    }
    getLoans()
  }, [])

  return (
    <div>
      <Head>
        <title>Thunder DAO</title>
        <meta name='description' content='Thunder DAO Management Console' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div className='px-0 py-8 text-white md:px-16 max-w-7xl'>
          <div className='mt-8 text-2xl text-center md:mt-8 md:text-5xl'>
            Thunder DAO Management Console
          </div>
          <ConsoleStats loans={loans} />
        </div>
      </Layout>

      <footer></footer>
    </div>
  )
}

export default Home
