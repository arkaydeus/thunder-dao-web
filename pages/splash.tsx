import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '../public/logo.svg'

const Splash: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Thunder DAO</title>
        <meta name='description' content='Thunder DAO' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="min-h-screen bg-[url('../public/thunder.jpeg')] bg-cover bg-center flex justify-center">
        <div className='flex flex-col items-center m-20'>
          <div className='p-6 border-8 rounded-full'>
            <h1 className='text-6xl text-white'>Thunder DAO</h1>
          </div>
          <div className='w-48 mt-16'>
            <Image src={Logo} />
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  )
}

export default Splash
