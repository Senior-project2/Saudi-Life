"use client"
import Container from "@/components/Container"
import { SafeActivities, SafeUser} from "../types"
import Heading from "@/components/Heading"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import ActivityCard from "@/components/activities/ActivityCard"
import { parseISO, isPast } from "date-fns"

interface MyActivityesClientProps {
    activities: SafeActivities[]
    currentUser?: SafeUser | null



}
const MyActivityesClient: React.FC<MyActivityesClientProps> = ({
    activities,
    currentUser
}) => {
    const filteredActivities = activities.filter((activity) => {
        let activityDateTime;
        if (activity.activityDate && activity.activityTime) {
            const datePart = typeof activity.activityDate === 'string' 
                ? parseISO(activity.activityDate).toISOString().split('T')[0] 
                : activity.activityDate.toISOString().split('T')[0];
            const combinedDateTime = `${datePart}T${activity.activityTime}`;
            activityDateTime = parseISO(combinedDateTime);
        }
        const expired = activityDateTime ? !isPast(activityDateTime) : true;
        return expired
    });
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
            
            {activities.map((activity) => {
                    let activityDateTime;
                    if (activity.activityDate && activity.activityTime) {
                        const datePart = typeof activity.activityDate === 'string' 
                            ? parseISO(activity.activityDate).toISOString().split('T')[0] 
                            : activity.activityDate.toISOString().split('T')[0];
                        const combinedDateTime = `${datePart}T${activity.activityTime}`;
                        activityDateTime = parseISO(combinedDateTime);
                    }
                    const expired = activityDateTime ? isPast(activityDateTime) : false;

                    return (
                        <ActivityCard
                            key={activity.id}
                            data={activity}
                            actionID={activity.id}
                            onAction={onCancel}
                            disabled={deletingId === activity.id || expired}
                            actionLabel={!expired ? "Cancel activity" : undefined}
                            currentUser={currentUser}
                            expired={!expired ? undefined : "Expired"}
                        />
                    );
                })}
            </div>
        </Container>
  )
}

export default MyActivityesClient