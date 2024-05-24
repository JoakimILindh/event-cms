import { UserListItem } from "@/components/user-list-item"

export const AttendeeList = ({ attendees }) => {
  return (
    <>
      <p className="text-xl font-semibold">Attendees:</p>
      <div>
        {
          attendees.map(attendee => (
            <UserListItem email={attendee.email} imageUrl={attendee.imageUrl} onClick={() => {}} isSelected={false} />
          ))
        }
      </div>
    </>
  )
}