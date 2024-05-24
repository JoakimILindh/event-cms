'use client'

import { getCollection } from "@/lib/firebaseUtils"
import { useEffect, useState } from "react"
import { EventListItem } from "./event-list-item"

export const EventsList = () => {

  const [events, setEvents] = useState([])
 
  useEffect(() => {
    const getEvents = async () => {
      const res = await getCollection('events')
      setEvents(res)
    }
    getEvents()
  }, [])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      {
        !!events.length ? events.map(event => (
          <EventListItem key={event.id} event={event} />
        )) : <p>No events found</p>
      }
    </div>
  )
}