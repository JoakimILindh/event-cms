'use client'
import { Button } from "@/components/ui/button"
import { getDocumentById, removeDocument } from "@/lib/firebaseUtils"
import Link from "next/link"
import { useEffect, useState } from "react"
import { EditEventForm } from "../_components/edit-event-form"
import { useRouter } from "next/navigation"
import { deleteObject, ref } from "firebase/storage"
import { storage } from "@/firebase.config"
import { AttendeeList } from "../_components/attendee-list"

const EditEvent = ({id, event, attendees}) => {

  const router = useRouter()
  // const [event, setEvent] = useState(null)

  // useEffect(() => {
  //   const getEvent = async () => {
  //     const event = await getDocumentById('events', id)
  //     setEvent(event)
  //   }
  //   getEvent()
  // }, [])

  if(!event) return null

  const handleRemoveEvent = async () => {
    const fileRef = ref(storage, `/events/${id}/${event?.imageRef}`)
    await deleteObject(fileRef)

    await removeDocument('events', event.id)
    router.replace('/admin/events')
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Button asChild>
          <Link href="/admin/events">
            Go back
          </Link>
        </Button>
        <Button variant="destructive" onClick={handleRemoveEvent}>Delete Event</Button>
      </div>
      <div className="mt-10">
        <EditEventForm event={event} />
      </div>
      <div className="mt-10">
        <AttendeeList attendees={attendees} />
      </div>
    </>
  )
}
export default EditEvent