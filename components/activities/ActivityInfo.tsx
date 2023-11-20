"use client"
import { SafeUser } from "@/app/types"
import { IconType } from "react-icons"
import useSaudiStates from "@/app/hooks/useLocation"
import Avatar from "../Avatar"
import ActivityCategory from "./ActivityCategory"
import Map from "../Map"
import Counter from "../Counter"
import { useState } from "react"
import toast from "react-hot-toast"
import CustomButton from "../CustomButton"
import Modal from "../modals/Modal"
import axios from "axios"



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
    activityId: string
    
    
    
}

const ActivityInfo: React.FC<ActivityInfoProps> = ({
    user,
    description,
    guestCount,
    locationValue,
    category,
    activityDate,
    activityId
    
    
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reviewContent, setReviewContent] = useState('');
    const {getByValue} = useSaudiStates()
    const coordinateslat = getByValue(locationValue)?.latitude
    const coordinateslng = getByValue(locationValue)?.longitude
    const handleAddReviewClick = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
       
    };
    const handleReviewSubmit = async () => {
        if (!reviewContent.trim()) {
            toast.error('Please enter a review.');
            return;
        }

        try {
            const response = await axios.post('/api/reviews', {
                content: reviewContent,
                userId: user.id, // Assuming `user` prop has the user's ID
                activityId: activityId,
            });

            // Assuming you want to display the newly created review
            console.log('Review Created:', response.data);

            toast.success('Review submitted successfully');
            setReviewContent('');
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        }
    };
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
<hr/>
    <CustomButton
    onClick={handleAddReviewClick}
    label="Add Review"
    />
     <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleReviewSubmit}
                title="Add a Review"
                actionLabel="Submit Review"
                body={(
                    <textarea
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Write your review here..."
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                )}
            />
    
    </div>
    
  )
}

export default ActivityInfo