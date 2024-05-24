import { PageHeadline } from "@/components/page-headline"
import { ManageAdmins } from "./_components/manage-admins"
import { clerkClient } from "@clerk/nextjs/server"

export const dynamic = "force-dynamic"

async function AdminsPage() {

  const clerkUsers = await clerkClient.users.getUserList()

  const users = clerkUsers.data.map(user => ({
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    imageUrl: user.imageUrl
  }))

  return (
    <div>
      <PageHeadline className="mb-0">Admins</PageHeadline>
      <p className="text-muted-foreground text-center mb-10">Click to select one or multiple users to upgrade to admins</p>
      <ManageAdmins clerkUsers={users} />
    </div>
  )
}
export default AdminsPage