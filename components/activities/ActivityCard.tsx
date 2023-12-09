"use client"

import { SafeUser, SafeActivities, SafeBookings } from "@/app/types";
import { Bookings, Listings } from "@prisma/client";
import { useRouter } from "next/navigation";
import useSaudiStates from "@/app/hooks/useLocation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import FavoriteButton from "./FavoriteButton";
import CustomButton from "../CustomButton";


interface ActivityCardProps{
    data: SafeActivities
    booking?: SafeBookings
    onAction?:(id: string) => void
    disabled?: boolean
    actionLabel?: string
    actionID?: string
    currentUser?: SafeUser | null;
    expired?: string
    
}

const ActivityCard: React.FC<ActivityCardProps> = ({
    data,
    booking,
    onAction,
    disabled,
    actionLabel,
    actionID = '',
    currentUser,
    expired

}) => {
    const router = useRouter()
    const {getByValue} = useSaudiStates()

    const location = getByValue(data.locationValue)
    const handleCancel = useCallback((
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            if(disabled){
                return
            }
            onAction?.(actionID)
        },[onAction, disabled, actionID])

        const price = useMemo(() => {
            if(booking){
                return booking.totalPrice
            }
            return data.price
        }, [booking, data.price])

       
  return (
    <div className="
    col-span-1
    cursor-pointer
    group
    "
    onClick={() => router.push(`/Activities/${data.id}`)}>
        <div className="flex flex-col 
        gap-2
        w-full">
            <div className="aspect-square 
            w-full
            relative
            overflow-hidden
            rounded-xl
            ">
                <Image
                fill
                alt="Activity Image"
                src={data.imageSrc}
                className="object-cover
                h-full
                w-full
                group-hover:scale-110
                transition
                "
                />
                <div className="
                absolute
                top-3
                right-3
                ">
                    <FavoriteButton
                    activityID={data.id}
                    currentUser={currentUser}
                    />

                </div>
            </div>
            <div className="
            font-semi-bold
            text-lg
            ">
                {location?.label}

            </div>
            <div className="
            font-light
            text-neutral-400
            ">
                {data.category}

            </div>
            <div className="
            flex
            flex-row
            items-center
            gap-1
            ">
                <div className="
                font-semi-bold
                ">
                    SAR {price}
                </div>
                {! booking && (
                    <div className="font-light">
                        Per Guest
                    </div>

                )}
            </div>
            {onAction && actionLabel && (
                <CustomButton
                disabled={disabled}
                small
                label={actionLabel}
                onClick={ handleCancel }
                />
            )}
            <div className="
            font-light
          text-red-600
            ">
                {expired}

            </div>

        </div>

    </div>
  )
}

export default ActivityCard