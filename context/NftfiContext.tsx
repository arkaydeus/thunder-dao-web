/* eslint-disable @typescript-eslint/no-empty-function */
import {
  collection,
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

export type ListingCollection = Record<string, NftProjectListings>

export type nftfiContextType = {
  collections?: ListingCollection
  attachProjectCollections: (userId: string) => void
}

const nftfiContextDefaultValues: nftfiContextType = {
  collections: undefined,
  attachProjectCollections: () => {}
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
  const [collections, setCollections] = useState<ListingCollection>()

  console.log('Initiating nftfi provider')

  const attachProjectCollections = () => {
    if (collections) return

    const unsubscribe = onSnapshot(
      collection(db, 'instances/prod/listings'),

      async snapshot => {
        const snapshotData = snapshot.docs

        if (!snapshotData) return

        const collections: ListingCollection = {}
        snapshotData.forEach(collection => {
          collections[collection.id] = collection.data()
        })

        setCollections(collections)
      },
      error => {
        console.log('Firebase: ' + error.message)
      }
    )

    return unsubscribe
  }

  useEffect(() => {
    console.log('running attach once')
    return attachProjectCollections()
  }, [])

  const value: nftfiContextType = {
    collections,
    attachProjectCollections
  }

  return (
    <>
      <NftfiContext.Provider value={value}>{children}</NftfiContext.Provider>
    </>
  )
}
