import { PageHeadline } from "@/components/page-headline"
import { DataCard } from "./_components/data-card"
import { clerkClient } from "@clerk/nextjs/server"
import { getCollection } from "@/lib/firebaseUtils"

async function AdminDashboardPage() {

  const clerkUsers = await clerkClient.users.getUserList()
  const events = await getCollection('events')
  return (
    <div>
      <PageHeadline>Dashboard</PageHeadline>
      <div className="grid grid-cols-2 gap-10">
        <DataCard data={clerkUsers.data.length} text="active members" />
        <DataCard data={events.length} text="events created" />
      </div>
    </div>
  )
}
export default AdminDashboardPage