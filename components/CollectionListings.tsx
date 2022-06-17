import { useEffect, useState } from 'react'
import { getArtwork } from '../lib/utils'
import { Listing } from '../models/Listing'
import { NftProjectListings } from '../models/NftProjectListings'
import ListingTable from './ListingTable'

interface ICollectionListings {
  collection: NftProjectListings
  collectionName: string
}

const CollectionListings = ({
  collection,
  collectionName
}: ICollectionListings) => {
  const [listingsWithArt, setListingsWithArt] = useState<Listing[]>([])

  useEffect(() => {
    let listingArray: Listing[] = []

    const getAllArtwork = async () => {
      if (collection) {
        listingArray = Object.keys(collection)
          .map(key => collection[key])
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
  }, [collection])

  if (!collection || Object.keys(collection).length === 0) return <></>

  return (
    <div>
      <div className='mt-16 text-xl text-white'>{collectionName}</div>
      <ListingTable listings={listingsWithArt} />
    </div>
  )
}

export default CollectionListings
