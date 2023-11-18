"use client"

import CustomButton from "../CustomButton"


interface ActivityReservationProps {
    price: number
    numberOfGuests: number
    totalPrice: number
    onSubmit: () => void
    disabled?: boolean
    maxGuests: number

}

const ActivityReservation: React.FC<ActivityReservationProps> = ({
    price,
    numberOfGuests,
    totalPrice,
    onSubmit,
    disabled,
    maxGuests
}) => {
    const isBookingFull = numberOfGuests > maxGuests;
    
    
  return (
    <div className="bg-white
    rounded-xl 
    border-[1px]
    border-neutral-200
    overflow-hidden
    ">
        
        <div className="
        flex
        flex-row
        items-center
        gap-1
        p-4">
            
            
            <div className="text-2xl
            font-semibold
            ">
                {price}SAR

            </div>
            <hr/>
            <div className="font-light text-neutral-600">
                Per Guest

            </div>
            <div className="p-4 flex flex-row items-center font-semibold text-lg">
                <div>
                Total ({numberOfGuests} Guests)
                </div>
                <div>
                    {totalPrice} SAR
                </div>
            </div>
            
            


        </div>
        <div className="p-4">
                <CustomButton
                disabled={disabled || isBookingFull}
                label="Book Activity"
                onClick={onSubmit}
                />

            </div>
    </div>
  )
}

export default ActivityReservation