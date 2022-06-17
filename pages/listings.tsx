import { NextPage } from 'next'
import Head from 'next/head'
import CollectionListings from '../components/CollectionListings'
import Layout from '../components/Layout'
import { useNftfiContext } from '../context/NftfiContext'

const Listings: NextPage = () => {
  const { collections } = useNftfiContext()

  console.log(collections)

  return (
    <div>
      <Head>
        <title>Active Listings</title>
        <meta name='description' content='Active Listings' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Layout>
        <div className='px-0 py-8 text-white md:px-16 max-w-7xl'>
          <div className='mt-8 text-2xl text-center md:mt-8 md:text-5xl'>
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
      </Layout>

      <footer></footer>
    </div>
  )
}

export default Listings
