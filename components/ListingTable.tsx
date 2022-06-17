import { Listing } from '../models/Listing'
import ListingItem from './ListingItem'

interface IListingTable {
  listings: Listing[]
}

const ListingTable = ({ listings }: IListingTable) => {
  return (
    <div className='grid grid-cols-1 gap-4 mt-16 lg:grid-cols-2'>
      {listings.map((listing: Listing) => {
        const artworkUrl = listing.artworkUrl
        return (
          <ListingItem listing={listing} key={listing.id} image={artworkUrl} />
        )
      })}
    </div>
  )
}

export default ListingTable
