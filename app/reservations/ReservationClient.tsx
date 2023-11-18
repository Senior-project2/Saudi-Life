"use client"
import {toast} from "react-hot-toast"
import {useState, useCallback} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SafeBookings, SafeUser } from "../types"
import Heading from "@/components/Heading"
import Container from "@/components/Container"
import ActivityCard from "@/components/activities/ActivityCard"

interface ReservationClientProps {
  bookings: SafeBookings[]
  currentUser?: SafeUser | null
}
const ReservationClient: React.FC<ReservationClientProps> = ({
  bookings,
  currentUser
}) => {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')
  const onCancel = useCallback((id: string) =>{
    setDeletingId(id)
    axios.delete(`/api/reservations/${id}`)
    .then(() => {
      toast.success('Reservation canceled')
      router.refresh()
    })
    .catch(()=>{
      toast.error("Somthing went wrong.")
    })
    .finally(() =>{
      setDeletingId('')
    
    })

  }, [router])
  return (
    <Container>
      <Heading
      title="Reservations"
      subtitle="Bookings made on your activity"
      />

      <div className="
      mt-10
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
      gap-8
      ">
        {bookings.map((booking) => (
          <ActivityCard
          key={booking.id}
          data={booking.listing}
          booking={booking}
          actionID={booking.id}
          onAction={onCancel}
          disabled={deletingId === booking.id}
          actionLabel={"Cancel Guest Booking"}
          currentUser={currentUser}
          />
        ))}

      </div>
    </Container>
  )
}

export default ReservationClient