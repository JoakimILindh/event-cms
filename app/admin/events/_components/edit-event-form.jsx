'use client'

import { ImageDropzone } from "@/components/image-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { storage } from "@/firebase.config"
import { addDocument, updateDocument } from "@/lib/firebaseUtils"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useRouter } from "next/navigation"

import { useState } from "react"

export const EditEventForm = ({ event: oldEvent }) => {
  const router = useRouter()
  const [formError, setFormError] = useState()
  const [formData, setFormData] = useState({
    name: oldEvent.name,
    description: oldEvent.description,
    location: oldEvent.location,
    date: oldEvent.date,
    seats: oldEvent.seats
  })

  const [selectedImage, setSelectedImage] = useState(oldEvent.image)
  const [imageError, setImageError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setFormError(null)
    if(!selectedImage || !formData.name || !formData.location || !formData.date || !formData.seats) {
      setFormError('All fields are required')
      setTimeout(() => {setFormError(null)}, 4000)
      return
    }

    if(oldEvent.image !== selectedImage) {

      const fileRef = ref(storage, `events/${oldEvent.id}/${oldEvent.imageRef}`)
      await deleteObject(fileRef)

      const reader = new FileReader()
      reader.onabort = () => setFormError('File reading was aborted')
      reader.onerror = () => setFormError('File reading has failed')
  
      reader.onload = async () => {
        await uploadFile(selectedImage)
      }
  
      reader.readAsArrayBuffer(selectedImage)
    } else {
      await updateDocument('events', oldEvent.id, {...formData, attendees: oldEvent.attendees })
      router.push('/admin/events')
    }

  }

  const uploadFile = async (file) => {

    try {

      const fileRef = ref(storage, `events/${oldEvent.id}/${file.name}`)

      const result = await uploadBytes(fileRef, file)

      if(!result) return
      const downloadURL = await getDownloadURL(fileRef)

      
      await updateDocument('events', oldEvent.id, {...formData, attendees: oldEvent.attendees, image: downloadURL, imageRef: file.name })
      
      router.push('/admin/events')
    } catch (err) {
      console.log(err.message)
      setFormError('Something went wrong, please try again later')
    }
  }

  const onChange = (e) => {
    setFormData(data => ({
      ...data,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      <ImageDropzone setImageError={setImageError} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      {
        imageError && (
          <div className="flex justify-center">
            <p className="text-red-500 px-10 bg-red-500/10 py-1 rounded-lg">{imageError}</p>
          </div>
        )
      }
      {
        formError && (
          <div className="flex justify-center">
            <p className="text-red-500 px-10 bg-red-500/10 py-1 rounded-lg">{formError}</p>
          </div>
        )
      }
      <div className="space-y-2">
        <Label htmlFor="name" >Event Name</Label>
        <Input id="name" value={formData.name} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description" >Description</Label>
        <Textarea id="description" value={formData.description} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location" >Location</Label>
        <Input id="location" value={formData.location} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="date" >Date</Label>
        <Input type="date" id="date" value={formData.date} onChange={onChange} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="seats" >Available spots</Label>
        <Input type="number" inputMode="numeric" id="seats" value={formData.seats} onChange={onChange} />
      </div>

      <Button>Save</Button>
      

    </form>
  )
}