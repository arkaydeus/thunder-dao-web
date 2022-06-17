import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import CollectionListings from '../components/CollectionListings'
import ListingTable from '../components/ListingTable'
import LoginForm from '../components/LoginForm'
import MenuBar from '../components/MenuBar'
import { useAuth } from '../context/AuthContext'
import { useNftfiContext } from '../context/NftfiContext'
import { getArtwork } from '../lib/utils'
import { Listing } from '../models/Listing'
// import Logo from '../public/logo.svg'

const Listings: NextPage = () => {
  const { loggedIn } = useAuth()

  const { collections } = useNftfiContext()

  console.log(collections)

  return (
    <div>
      <Head>
        <title>Active Listings</title>
        <meta name='description' content='Active Squiggle Listings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="min-h-screen bg-[url('../public/thunder.jpeg')] bg-fixed bg-cover bg-center flex justify-center">
        {!loggedIn ? (
          <div className='flex items-center justify-center flex-1'>
            <LoginForm />
          </div>
        ) : (
          <div className='flex-1 grid-cols-5 lg:grid '>
            <MenuBar selected='listings' />
            <div className='flex flex-col col-span-4 px-8 bg-black/50'>
              <div className='px-0 py-8 md:px-16 max-w-7xl rounded-xl'>
                <div className='md:mt-8 mt-8 text-white md:text-5xl text-2xl font-[500] text-center'>
                  Active Listings Within Target Range
                </div>
                {collections &&
                  Object.keys(collections).map(collection => {
                    return (
                      <CollectionListings
                        collection={collections[collection]}
                        collectionName={collection}
                        key={collection}
                      />
                    )
                  })}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer></footer>
    </div>
  )
}

export default Listings
