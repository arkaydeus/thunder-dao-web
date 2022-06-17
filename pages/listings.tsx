import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
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

  const { listings } = useNftfiContext()

  console.log(listings)

  const [listingsWithArt, setListingsWithArt] = useState<Listing[]>([])

  useEffect(() => {
    let listingArray: Listing[] = []

    const getAllArtwork = async () => {
      if (listings) {
        listingArray = Object.keys(listings)
          .map(key => listings[key])
          .sort((a: Listing, b: Listing) => {
            return (
              new Date(b.date.listed).getTime() -
              new Date(a.date.listed).getTime()
            )
          })

        listingArray = await Promise.all(
          listingArray.map(async listing => {
            listing.artworkUrl = await getArtwork(
              listing.nft.address,
              listing.nft.id
            )
            return listing
          })
        )
        setListingsWithArt(listingArray)
      }
    }
    getAllArtwork()
  }, [listings])

  return (
    <div>
      <Head>
        <title>Active Listings</title>
        <meta name='description' content='Active Squiggle Listings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className="min-h-screen bg-[url('../public/thunder.jpeg')] bg-cover bg-center flex justify-center">
        {!loggedIn ? (
          <div className='flex items-center justify-center flex-1'>
            <LoginForm />
          </div>
        ) : (
          <div className='flex-1 grid-cols-5 md:grid '>
            <MenuBar selected='listings' />
            <div className='flex flex-col col-span-4 px-8 bg-black/50'>
              <div className='px-16 py-8 max-w-7xl rounded-xl'>
                <div className='md:mt-8 mt-8 text-white md:text-5xl text-2xl font-[500] text-center'>
                  Active Listings Within Target Range
                </div>
                <div>
                  <ListingTable listings={listingsWithArt} />
                </div>
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
