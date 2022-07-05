/* eslint-disable @typescript-eslint/no-empty-function */
import {
  collection,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc
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
import { OfferRule, OfferRules } from '../models/OfferRules'

export interface IIdentifySummary {
  reference?: DocumentReference
  id?: string
}

export type ListingCollection = Record<string, NftProjectListings>

export type nftfiContextType = {
  collections?: ListingCollection
  offerRules?: OfferRules
  attachDatasets: (userId: string) => void
  updateRule: (projectName: string, newRule: OfferRule) => Promise<boolean>
}

const nftfiContextDefaultValues: nftfiContextType = {
  collections: undefined,
  offerRules: undefined,
  attachDatasets: () => {},
  updateRule: () => Promise.resolve(false)
}

const NftfiContext = createContext<nftfiContextType>(nftfiContextDefaultValues)

export function useNftfiContext () {
  return useContext(NftfiContext)
}

type Props = {
  children: ReactNode
}
const db = getFirestore(firebaseApp)

const environmentPath = process.env.NODE_ENV === 'production' ? 'prod' : 'uat1'

export const NftfiProvider = ({ children }: Props) => {
  const [collections, setCollections] = useState<ListingCollection>()
  const [offerRules, setOfferRules] = useState<OfferRules>()

  console.log('Initiating nftfi provider')

  const attachProjectCollections = () => {
    if (collections) return

    const unsubscribe = onSnapshot(
      collection(db, `instances/${environmentPath}/listings`),

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

  const attachOfferRules = () => {
    if (offerRules) return

    const unsubscribe = onSnapshot(
      doc(db, `instances/${environmentPath}/config/offerRules`),

      async doc => {
        const snapshotData = doc.data()

        if (!snapshotData) return

        setOfferRules(snapshotData)
      },
      error => {
        console.log('Firebase: ' + error.message)
      }
    )

    return unsubscribe
  }

  useEffect(() => {
    console.log('Attaching listings once')
    return attachProjectCollections() && attachOfferRules()
  }, [])

  useEffect(() => {
    console.log('Attaching offer rules once')
    return attachOfferRules()
  }, [])

  const updateRule = async (
    projectName: string,
    newRule: OfferRule
  ): Promise<boolean> => {
    const docRef = doc(db, `instances/${environmentPath}/config/offerRules`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const ruleData = await docSnap.data()
      ruleData[projectName] = newRule
      await setDoc(docRef, ruleData)
      return true
    }
    return false
  }

  const value: nftfiContextType = {
    collections,
    offerRules,
    attachDatasets: attachProjectCollections,
    updateRule
  }

  return (
    <>
      <NftfiContext.Provider value={value}>{children}</NftfiContext.Provider>
    </>
  )
}
