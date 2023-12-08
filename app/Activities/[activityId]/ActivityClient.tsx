"use client"
import { Bookings } from '@prisma/client'
import { SafeUser, SafeActivities, SafeBookings } from '@/app/types'
import { useCallback, useEffect, useMemo } from 'react'
import { categories } from '@/components/navbar/Categories'
import Container from '@/components/Container'
import ActivityHead from '@/components/activities/ActivityHead'
import ActivityInfo from '@/components/activities/ActivityInfo'
import useLoginModal from '@/app/hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import ActivityReservation from '@/components/activities/ActivityReservation'
import TotalPriceCounter from '@/components/TotalPriceCounter'
import { parse, format, parseISO, isPast } from 'date-fns'
import EmptyState from '@/components/EmptyState'




interface ActivityClientProps {
    bookings?: SafeBookings[]
    activity: SafeActivities & {
        user: SafeUser
    
    }
    currentUser?: SafeUser | null
}

const ActivityClient: React.FC<ActivityClientProps> = ({
    activity,
    currentUser,
    bookings = [],
}) => {
    const loginModal = useLoginModal()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [totalPrice, setTotalPrice] = useState(activity.price)
    const [numberOfGuests, setNumberOfGuests] = useState(1);


    const onCreateBooking = 
    useCallback(() =>{
        if(!currentUser){
            return loginModal.onOpen()
            
        }
        if (currentUser.id === activity.user.id) {
            toast.error("You can't book your own activity!");
            return; 
        }
        setIsLoading(true)
        axios.post('/api/bookings', {totalPrice, activityId: activity?.id, numberOfGuests
     })
        .then(() => {
            toast.success('Booking created successfully')
            //redirect to bookings
            router.push('/booking')
        })
        .catch(() =>{
            toast.error('Something went wrong')
        })
        .finally(()=>{
            setIsLoading(false)
        
        })
    }, [currentUser, loginModal, router, totalPrice, activity?.id, loginModal, numberOfGuests])

    
    
    
    useEffect(() => {
        const newTotalPrice = (activity.price * numberOfGuests);
        setTotalPrice(newTotalPrice);
    }, [numberOfGuests, activity.price]);


    const category = useMemo(() => {
        return categories.find((item) =>
         item.label === activity.category)
    }, [activity.category])
   
  return (
    <Container>
        <div className="max-w-screen-lg
        mx-auto
        ">
            <div className="flex 
            flex-col
             gap-6">
                <ActivityHead
                title={activity.title}
                imageSrc={activity.imageSrc}
                locationValue={activity.locationValue}
                id={activity.id}
                currentUser={currentUser}
                />
                <div className="
                grid
                grid-cols-1
                md:grid-cols-7
                md:gap-10
                mt-6">
                    <ActivityInfo
                    activityId={activity.id}
                    user={activity.user}
                    category={category}
                    description={activity.description}
                    guestCount={activity.guestCount}
                    locationValue={activity.locationValue}
                    activityDate={activity.activityDate ? activity.activityDate.toISOString().split('T')[0] : ''}
                    activityTime={activity.activityTime || ""}
                    />
                    <div className="order-first
                    mb-10
                    md:order-first
                    md:col-span-3">
                        <ActivityReservation
                        price={activity.price}
                        totalPrice={totalPrice}
                        numberOfGuests={numberOfGuests}
                        onSubmit={onCreateBooking}
                        disabled={isLoading}
                        maxGuests={activity.guestCount}
                      

                        />
                          <TotalPriceCounter
                    title="Number of Guests"
                    subtitle="Select the number of guests for the activity"
                    value={numberOfGuests}
                    onChange={setNumberOfGuests}
                    maxGuests={Math.min(5, activity.guestCount)}
                />

                    </div>

                </div>

            </div>

        </div>
    </Container>
  )
}

export default ActivityClient