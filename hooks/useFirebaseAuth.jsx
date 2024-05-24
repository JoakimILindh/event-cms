'use client'

import { auth } from "@/firebase.config"
import { useAuth } from "@clerk/nextjs"
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth"
import { useEffect, useState } from "react"

const useFirebaseAuth = () => {

  const { isLoaded, getToken } = useAuth()
  const [authLoaded, setAuthLoaded] = useState(false)

  useEffect(() => {
    if(!isLoaded) return

    const signInWithClerk = async () => {
      const token = await getToken({ template: "integration_firebase" })
      if(token)
        await signInWithCustomToken(auth, token)
    }
    signInWithClerk()

    const unsub = onAuthStateChanged(auth, user => {
      if(user != null) {
        setAuthLoaded(true)
      }
    })

    return () => unsub()

  }, [isLoaded])

  return { authLoaded }
}
export default useFirebaseAuth