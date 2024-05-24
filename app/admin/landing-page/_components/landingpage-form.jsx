'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getDocumentById, updateDocument } from "@/lib/firebaseUtils"
import { useEffect, useState } from "react"

export const LandingPageForm = () => {

  useEffect(() => {
    const getData = async () => {
      const data = await getDocumentById('pages', 'landing-page')
      setFormData({
        heading: data.heading,
        subheading: data.subheading
      })
    }
    getData()
  }, [])

  const [formData, setFormData] = useState({
    heading: '',
    subheading: ''
  })

  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const onChange = e => {
    setFormData(data => ({
      ...data,
      [e.target.id]: e.target.value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if(!formData.heading || !formData.subheading) {
      setErrorMessage('Please fill in all fields')
      setTimeout(() => { setErrorMessage('') }, 4000)
      return
    }


    try {
      await updateDocument('pages', 'landing-page', formData)
      setErrorMessage('')
      setMessage('Data saved successfully')
      setTimeout(() => { setMessage('') }, 4000)

    } catch (err) {
      console.log(err.message)
      setErrorMessage('Something went wrong, please try again later')
      setTimeout(() => { setErrorMessage('') }, 4000)
    }

  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      {
        errorMessage && (
          <div className="flex justify-center">
            <p className="text-red-500 px-10 bg-red-500/10 py-1 rounded-lg">{errorMessage}</p>
          </div>
        )
      }
      {
        message && (
          <div className="flex justify-center">
            <p className="text-green-500 px-10 bg-green-500/10 py-1 rounded-lg">{message}</p>
          </div>
        )
      }

      <div className="space-y-2">
        <Label htmlFor="heading" >Heading</Label>
        <Input id="heading" value={formData.heading} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subheading" >Sub Heading</Label>
        <Input id="subheading" value={formData.subheading} onChange={onChange} />
      </div>
      <Button>Save</Button>
    </form>
  )
}