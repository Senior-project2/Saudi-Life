import ClientOnly from "@/components/ClientOnly";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import getActivities, { IActivityParams } from "./actions/getActivities";
import ActivityCard from "@/components/activities/ActivityCard";
import getCurrentUser from "./actions/getCurrentUser";

interface HomeProps{
  searchParams: IActivityParams
}
const Home = async ( {searchParams}: HomeProps) => {
  const activites = await getActivities(searchParams);
  const isEmpty = true;
  const currentUser = await getCurrentUser()

  if(activites.length === 0){
    return(
      <ClientOnly>
        <EmptyState showReset/>
      </ClientOnly>
    )
  }
  //throw new Error("somthing went wrong")
  return (
    <ClientOnly>
      <Container>
     <div className="
     pt-24
     grid
     grid-cols-1
     sm:grid-cols-2
     md:grid-cols-3
     lg:grid-cols-4
     xl:grid-cols-5
     2xl:grid-cols-6
     gap-8">
        {activites.map((listings) => {
          return(
           <ActivityCard
           currentUser={currentUser}
           key={listings.id}
           // @ts-ignore
           data={listings}
           />
          )
        })}
      
     </div>
      </Container>
    </ClientOnly>
  )
}

export default Home