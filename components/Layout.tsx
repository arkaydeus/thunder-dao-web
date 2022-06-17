import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import LoginForm from './LoginForm'
import MenuBar from './MenuBar'

interface ILayout {
  children: ReactNode
}

const Layout = ({ children }: ILayout) => {
  const router = useRouter()

  const { loggedIn } = useAuth()

  return (
    <>
      <main className="min-h-screen bg-[url('../public/thunder.jpeg')] bg-fixed bg-cover bg-center flex justify-center">
        {!loggedIn ? (
          <div className='flex items-center justify-center flex-1'>
            <LoginForm />
          </div>
        ) : (
          <div className='flex-1 grid-cols-5 lg:grid '>
            <MenuBar selected={router.pathname.replace('/', '')} />
            <div className='flex flex-col col-span-4 px-8 bg-black/50'>
              {children}
            </div>
          </div>
        )}
      </main>

      <footer></footer>
    </>
  )
}

export default Layout
