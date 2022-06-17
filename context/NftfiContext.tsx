/* eslint-disable @typescript-eslint/no-empty-function */
import {
  doc,
  DocumentReference,
  getFirestore,
  onSnapshot
} from 'firebase/firestore'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import firebaseApp from '../firebase/clientApp'
import { NftProjectListings } from '../models/NftProjectListings'

export interface IIdentifySummary {
  reference?: DocumentReference
  id?: string
}

export type nftfiContextType = {
  listings?: NftProjectListings
  attachProjectListings: (userId: string) => void
}

const nftfiContextDefaultValues: nftfiContextType = {
  listings: undefined,
  attachProjectListings: () => {}
}

const NftfiContext = createContext<nftfiContextType>(nftfiContextDefaultValues)

export function useNftfiContext () {
  return useContext(NftfiContext)
}

type Props = {
  children: ReactNode
}
const db = getFirestore(firebaseApp)

export const NftfiProvider = ({ children }: Props) => {
  const [listings, setListings] = useState<NftProjectListings>()

  console.log('Initiating nftfi provider')

  const attachProjectListings = () => {
    if (listings) return

    const unsubscribe = onSnapshot(
      doc(db, 'instances/prod/listings/FLUF'),

      async snapshot => {
        const snapshotData: NftProjectListings | undefined = snapshot.data()

        if (!snapshotData) return

        setListings(snapshotData)
      },
      error => {
        console.log('Firebase: ' + error.message)
      }
    )

    return unsubscribe
  }

  useEffect(() => {
    console.log('running attach once')
    return attachProjectListings()
  }, [])

  const value: nftfiContextType = {
    listings,
    attachProjectListings
  }

  return (
    <>
      <NftfiContext.Provider value={value}>{children}</NftfiContext.Provider>
    </>
  )
}
