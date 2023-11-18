import getActivityByid from "@/app/actions/getActivityByid"
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly"
import EmptyState from "@/components/EmptyState"
import ActivityClient from "./ActivityClient";
import getBookings from "@/app/actions/getBookings";
interface IParams {
  activityId?: string;
}
const ActivityPage = async ({ params }: { params: IParams}) => {
  const activity = await getActivityByid(params)
  const currentUser = await getCurrentUser();
  const bookings = await getBookings(params);

  if(!activity){
    return(
      <ClientOnly>
      <EmptyState  />
    </ClientOnly>
  )
  }
  return (
   <div>
      <ActivityClient
      activity={activity}
      currentUser={currentUser}
      bookings={bookings}
      />
   </div>
  )
}

export default ActivityPage