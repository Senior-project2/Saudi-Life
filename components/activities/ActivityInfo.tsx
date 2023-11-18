"use client"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import useSaudiStates from "@/app/hooks/useLocation"
import Avatar from "../Avatar"
import ActivityCategory from "./ActivityCategory"
import Map from "../Map"
import Counter from "../Counter"
import { useState } from "react"




interface ActivityInfoProps {
    user: SafeUser
    description: string
    guestCount: number
    locationValue: string
    category: {
        icon: IconType
        label: string
        description: string
    } | undefined
    activityDate: string
    
    
    
}

const ActivityInfo: React.FC<ActivityInfoProps> = ({
    user,
    description,
    guestCount,
    locationValue,
    category,
    activityDate,
    
    
}) => {
    
    const {getByValue} = useSaudiStates()
    const coordinateslat = getByValue(locationValue)?.latitude
    const coordinateslng = getByValue(locationValue)?.longitude

  return (
    <div className="col-span-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
            <div className="text-xl font-semibold flex flex-row items-center gap-2">
                <div>
                    Hosted By {user?.name}
                    </div>
                    <Avatar src={user?.image}/>
            </div>
            
            <div className="
            flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500
            ">
                <div>
                    {guestCount} guests
                </div>
                {user?.phoneNumber && <span>  {user.phoneNumber}</span>}

            </div>
        </div>
        <hr/>
        {category && (
            <ActivityCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
            />
        )}
        <hr/>
        <div className=" text-lg font-light text-neutral-500">
            {description}
           

        </div>
        <div className=" text-lg font-light text-neutral-500">
        {activityDate}
           

        </div>
        
        <hr/>
        {coordinateslat && coordinateslng && (
  <Map
    center={[parseFloat(coordinateslat), parseFloat(coordinateslng)] }
  />
)}
    </div>
  )
}

export default ActivityInfo