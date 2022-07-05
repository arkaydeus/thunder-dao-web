import Link from 'next/link'
import { calcApr, valueOrAny } from '../lib/utils'
import { Listing } from '../models/Listing'

interface IListingItem {
  listing: Listing
  image: string | undefined
}

const niceDateTime = (value: string) => {
  const isoDate = new Date(value).toISOString()
  return isoDate.slice(0, 10) + ' ' + isoDate.slice(11, 19)
}

const ListingItem = ({ listing, image }: IListingItem) => {
  return (
    <div className='flex justify-center flex-1'>
      <Link
        key={listing.id}
        href={`https://app.nftfi.com/assets/${listing.nft.address}/${listing.nft.id}`}
      >
        <div className='flex flex-row flex-1 p-4 text-sm text-white border-2 border-white shadow-md rounded-xl shadow-white/50 hover:cursor-pointer'>
          <div className='sm:max-w-[10rem] max-w-[5rem] flex flex-col justify-center rounded-lg'>
            <img
              className='rounded-xl'
              src={image}
              // width={1}
              // height={1}
              alt={listing.nft.id}
            />
          </div>
          <div className='flex flex-col justify-center flex-1 ml-4'>
            <div className='flex flex-row justify-between'>
              <span className='font-bold '>Listing time</span>
              <span className='text-right text-primary'>
                {valueOrAny(niceDateTime(listing.date.listed))}
              </span>
            </div>
            <div className='flex flex-row justify-between '>
              <span className='font-bold '>Token ID</span>
              <span className='text-right text-primary'>
                {valueOrAny(listing.nft.id)}
              </span>
            </div>
            <div className='flex flex-row justify-between '>
              <span className='font-bold '>Req. duration</span>
              <span className='text-right text-primary'>
                {valueOrAny(parseInt(listing.terms.loan.duration))}
              </span>
            </div>
            <div className='flex flex-row justify-between '>
              <span className='font-bold '>Req. amount</span>
              <span className='text-right text-primary'>
                {valueOrAny(parseInt(listing.terms.loan.principal) / 10 ** 18)}
              </span>
            </div>
            <div className='flex flex-row justify-between '>
              <span className='font-bold '>Req. APY</span>
              <span className='text-right text-primary'>
                {valueOrAny(
                  Math.round(
                    calcApr(
                      parseInt(listing.terms.loan.principal),
                      parseInt(listing.terms.loan.repayment),
                      parseInt(listing.terms.loan.duration)
                    ) || 0
                  )
                )}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ListingItem
