'use client'

import { FullscreenLoader } from "@/components/fullscreen-loader"
import useFirebaseAuth from "@/hooks/useFirebaseAuth"
import { getDocumentById } from "@/lib/firebaseUtils"
import { UserButton, useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { SidebarNav } from "./_components/sidebar-nav"

function AdminLayout({ children }) {

  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  const { authLoaded } = useFirebaseAuth()
  const { userId } = useAuth()

  useEffect(() => {
    if(!authLoaded) return
    const checkAdmin = async () => {
      const admin = await getDocumentById('admins', userId)

      if(admin) setIsAdmin(true)
      else router.replace('/')
    }
    checkAdmin()
  }, [authLoaded])
  
  if(!authLoaded || !isAdmin) return (
    <FullscreenLoader />
  )

  return (
    <div className="h-screen grid grid-cols-[250px_1fr]">
      <SidebarNav />
      <main className="px-10 pt-10 overflow-y-auto">
        { children }
      </main>
    </div>
  )
}
export default AdminLayout