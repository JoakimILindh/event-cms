import { PageHeadline } from "@/components/page-headline"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { EventsList } from "./_components/events-list"

function EventsPage() {
  return (
    <div>
      <PageHeadline>Events</PageHeadline>
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/admin/events/create">
            Create new Event
          </Link>
        </Button>
      </div>
      <div className="mt-10">
        <EventsList />
      </div>
    </div>
  )
}
export default EventsPage