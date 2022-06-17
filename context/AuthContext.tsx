/* eslint-disable @typescript-eslint/no-empty-function */
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/clientApp'

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

type authContextType = {
  loggedIn?: boolean
  userId: string
  login: (email: string, password: string) => void
  logout: () => void
}

type Props = {
  children: ReactNode
}

const authContextDefaultValues: authContextType = {
  loggedIn: undefined,
  userId: '',
  login: () => {},
  logout: () => {}
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: Props) => {
  const [loggedIn, setLoggedIn] = useState<boolean | undefined>(undefined)
  const [userId, setUserId] = useState<string>('')

  // Console log changes in logged in state
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (loggedIn) {
        const uid = user?.uid
        console.log({ uid })
      } else {
        console.log('no user')
      }
    })
  }, [loggedIn])

  const login = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user
        console.log(user.toJSON())
        if (user.email) setUserId(user.email)
        setLoggedIn(true)
      })
      .catch(error => {
        const errorMessage = error.message
        console.log(errorMessage)
      })
  }

  const logout = () => {
    auth.signOut()
    setLoggedIn(false)
    console.log('logout')
  }

  const value = {
    loggedIn,
    userId,
    login,
    logout
  }

  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  )
}
