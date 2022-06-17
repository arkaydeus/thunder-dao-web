import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import LoanTable from '../components/LoanTable'
import LoginForm from '../components/LoginForm'
import MenuBar from '../components/MenuBar'
import { useAuth } from '../context/AuthContext'
import { Loan } from '../models/Loan'

const Loans: NextPage = () => {
  const [loans, setLoans] = useState<Loan[]>([])
  const { loggedIn } = useAuth()

  useEffect(() => {
    const getLoans = async () => {
      const response = await fetch(
        'https://api.nftfi.com/loans/history/0x82c66866043593fc59b4e6630b4455780fa89e2c'
      )
      const data = await response.json()
      if (data) {
        const filteredData = data.filter(
          (item: Loan) => item.status === 'escrow'
        )
        setLoans(filteredData)
      }
    }
    getLoans()
  }, [])

  return (
    <div>
      <Head>
        <title>Current Loans</title>
        <meta name='description' content='Current loans' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="min-h-screen bg-[url('../public/thunder.jpeg')] bg-cover bg-center flex justify-center">
        {!loggedIn ? (
          <div className='flex items-center justify-center flex-1'>
            <LoginForm />
          </div>
        ) : (
          <div className='flex-1 grid-cols-5 md:grid '>
            <MenuBar selected='loans' />
            <div className='flex flex-col col-span-4 px-8 text-white bg-black/50'>
              <div className='max-w-6xl'>
                <div className='mt-8 text-2xl text-center md:mt-36 md:text-5xl'>
                  Current DAO Loans
                </div>
                <div>{loans && <LoanTable loans={loans} />}</div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer></footer>
    </div>
  )
}

export default Loans
