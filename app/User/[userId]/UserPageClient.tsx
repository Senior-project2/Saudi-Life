"use client";
import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import UserAvatar from "@/components/UserAvatar";
import { SafeUser, SafeActivities } from "@/app/types";
import ActivityCard from "@/components/activities/ActivityCard";
import ReviewModal from "@/components/modals/ReviewModal";
import useDisplayReviewsModal from "@/app/hooks/useDisplayReviewsModal";
import ReviewDisplayModal from "@/components/modals/ReviewDisplayModal";
import { SafeReviews } from "@/app/types";
import { set } from "date-fns";
interface UserPageProps {
  user: SafeUser | null;
  activities: SafeActivities[];
  loggedInUser: SafeUser | null;
  reviews: SafeReviews[];
}

const UserPage: React.FC<UserPageProps> = ({ 
    user,
    activities,
    loggedInUser,
    reviews
   }) => {
  if (!user) {
    return null;
  }
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);
  const handleOpenReviews = () => {
    setIsReviewsModalOpen(true);
  };
  const handleCloseReviews = () => {
    setIsReviewsModalOpen(false);
  }
  const { onOpen } = useDisplayReviewsModal();


  
  

  return (
    <Container>
      <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="">
            <UserAvatar src={user?.image} />
          </div>
          <div
            className="
        flex 
        flex-col"
          >
            <div
              className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center 
            gap-2"
            >
              {user?.name}
            </div>

            <div
              className="
            font-light 
          text-neutral-500"
            >
              {user?.email}
            </div>
            <div
              className="
            font-light 
          text-neutral-500"
            >
              {user?.phoneNumber}
            </div>
          </div>
        </div>
        <hr />
        <div className="text-xl font-semibold ">About this user:</div>
        <div
          className="flex
            flex-row
            items-center
            gap-4
            font-light
            text-neutral-500"
        >
          <div> {user.description 
                  ? user.description 
                    :"No description available for this user."}</div>
        </div>
        <hr />
        <div className="text-xl font-semibold">User Activities:</div>
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
        {activities.length > 0 ? activities.map(activity => (
          <ActivityCard
            key={activity.id}
            currentUser={user}
            data={activity}
          />
        )) : (
          <div>No activities found for this user.</div>
        )}
      </div>
        <hr />
        <div>
          {loggedInUser && (
            <ReviewModal
            authorId={loggedInUser.id}
            reviewedUserId={user.id}
            />
            
          )}
        </div>
        <div className="
            text-neutral-500
            text-center
            mt-4
            font-light">
               
                <div className="
                text-neutral-800
                cursor-pointer
                hover:underline"
                onClick={onOpen}
                >
                    View reviews of the user
                </div>
                <ReviewDisplayModal
                reviews={reviews}
                />
              
               

            </div>
      </div>
    </Container>
  );
};

export default UserPage;
