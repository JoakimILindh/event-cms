import Image from "next/image"
import Link from "next/link"

export const EventListItem = ({ event }) => {
  return (
    <Link href={`/admin/events/${event.id}`} className="border rounded-lg overflow-hidden flex hover:bg-slate-500/10">
      <div className="aspect-square h-24">
        <Image 
          src={event.image}
          width={100}
          height={100}
          alt={event.name}
          className="size-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col justify-between">
        <p className="font-semibold text-lg">{ event.name }</p>
        <p className="text-sm text-muted-foreground">{ event.date }</p>
      </div>
    </Link>
  )
}