import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import LoanSummary from '../components/LoanSummery'
import LoanTable from '../components/LoanTable'
import { Loan } from '../models/Loan'
// import Logo from '../public/logo.svg'

const Loans: NextPage = () => {
  const [loans, setLoans] = useState<Loan[]>([])

  useEffect(() => {
    const getLoans = async () => {
      const response = await fetch(
        'https://api.nftfi.com/loans/history/0x82c66866043593fc59b4e6630b4455780fa89e2c'
      )
      const data: [] = await response.json()
      if (data) {
        const filteredData = data.filter(
          (item: Loan) => item.status !== 'escrow'
        )
        setLoans(filteredData)
      }
    }
    getLoans()
  }, [])

  return (
    <div>
      <Head>
        <title>Loan History</title>
        <meta name='description' content='Squiggle DAO Loan History' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div className='px-0 py-8 text-white md:px-16 max-w-7xl'>
          <div className='mt-8 text-2xl text-center md:mt-8 md:text-5xl'>
            DAO Loan History
          </div>
          <div>{loans && <LoanSummary loans={loans} />}</div>
          <div>{loans && <LoanTable loans={loans} />}</div>
        </div>
      </Layout>
      <footer></footer>
    </div>
  )
}

export default Loans
