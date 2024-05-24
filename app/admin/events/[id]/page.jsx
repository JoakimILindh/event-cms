
import { PageHeadline } from "@/components/page-headline"
import { clerkClient } from "@clerk/nextjs/server"
import EditEvent from "../_components/edit-event"
import { getDocumentById } from "@/lib/firebaseUtils"

export const dynamic = 'force-dynamic'

async function EditEventPage({ params }) {

  const event = await getDocumentById('events', params.id)
  const clerkUsers = await clerkClient.users.getUserList()
  const users = clerkUsers.data.map(user => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    imageUrl: user.imageUrl
  }))

  const attendees = users.filter(u => event.attendees.some(a => a == u.id))
  return (
    <div>
      <PageHeadline>Edit Event</PageHeadline>
      <EditEvent id={params.id} event={event} attendees={attendees} />
    </div>
  )
}
export default EditEventPage