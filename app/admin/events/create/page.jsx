import { PageHeadline } from "@/components/page-headline"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CreateEventForm } from "../_components/create-event-form"

function CreateEventPage() {
  return (
    <div>
      <PageHeadline>Create new event</PageHeadline>
      <Button asChild>
        <Link href="/admin/events">
          Go back
        </Link>
      </Button>
      <div className="mt-10">
        <CreateEventForm />
      </div>
    </div>
  )
}
export default CreateEventPage