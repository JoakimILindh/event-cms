'use client'
import { FullscreenLoader } from "@/components/fullscreen-loader"
import { Button } from "@/components/ui/button"
import { getDocumentById } from "@/lib/firebaseUtils"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useState } from "react"

function LandingPage() {

  const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await getDocumentById('pages', 'landing-page')
      setPageData(data)
    }
    getData()
  }, [])

  if(!pageData) return <FullscreenLoader />
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-6xl font-bold mb-4 text-center">{pageData.heading}</h1>
      <p className="text-center text-muted-foreground">{ pageData.subheading }</p>
      <Button asChild className="mt-10">
        <Link href="/admin/dashboard">Get started</Link>
      </Button>
      {/* <UserButton /> */}
    </div>
  )
}
export default LandingPage