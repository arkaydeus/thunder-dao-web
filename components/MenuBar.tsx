import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'

export interface IMenuBar {
  selected: string
}

type MenuItem = {
  label: string
  path: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Listings',
    path: 'listings'
  },
  {
    label: 'Current loans',
    path: 'loans'
  },
  {
    label: 'Loan history',
    path: 'history'
  }
]

const MenuItems = ({ selected }: { selected: string }) => {
  return (
    <>
      {MENU_ITEMS.map(item => {
        const isSelected =
          selected === item.path
            ? 'px-4 py-0 text-lg text-center border-0 rounded-full bg-primary text-black'
            : // ? 'px-4 py-0 text-lg text-center border-0 rounded-full bg-slate-200 text-black'
              'text-lg text-center text-white'
        return (
          <div className='flex justify-center mt-2 lg:mt-8' key={item.path}>
            <div className={isSelected}>
              <Link href={'/' + item.path}>{item.label}</Link>
            </div>
          </div>
        )
      })}
    </>
  )
}

const MenuBar = ({ selected }: IMenuBar) => {
  const { logout } = useAuth()

  return (
    <div className='items-center col-span-1 pb-6 border-b-2 lg:border-b-0'>
      <div className='md:max-w-[10rem] max-w-[5rem] mx-auto mt-16'>
        <Image
          layout='responsive'
          width={1}
          height={1}
          className=''
          alt='logo'
          src='/logo.svg'
          priority
        />
      </div>
      <div className='text-xl text-center text-white uppercase'>
        Thunder DAO
      </div>
      <div className='pt-6 mt-8 text-lg text-center text-primary border-white/40'>
        Management console
      </div>
      <div className='flex-col items-center mt-16'>
        <MenuItems selected={selected} />
      </div>
      <div
        className='mt-2 text-lg text-center text-white md:mt-8'
        onClick={() => logout()}
      >
        Logout
      </div>
    </div>
  )
}

export default MenuBar
