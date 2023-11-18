"use client"
import Container from "@/components/Container"
import { SafeActivities, SafeUser} from "../types"
import Heading from "@/components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ActivityCard from "@/components/activities/ActivityCard"

interface MyActivityesClientProps {
    activities: SafeActivities[]
    currentUser?: SafeUser | null



}
const MyActivityesClient: React.FC<MyActivityesClientProps> = ({
    activities,
    currentUser
}) => {
    const router = useRouter()
    const[deletingId, setDeletingId] = useState('')
    const onCancel = useCallback((id: string) => {
        setDeletingId(id)
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success('Listing deleted successfully')
            router.refresh()
        })
        .catch((error) =>{
            toast.error(error?.response?.data?.error)
        })
        .finally(() =>{
            setDeletingId('')
        })
    },[router])

  return (
    <Container>
        <Heading
        title="Your Activities"
        subtitle="List of your activities."
        />
        <div className="mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        ">
            {activities.map((activity) =>(
                <ActivityCard
                key={activity.id}
                data={activity}
                actionID={activity.id}
                onAction={onCancel}
                disabled={deletingId === activity.id}
                actionLabel="Cancel activity"
                currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default MyActivityesClient