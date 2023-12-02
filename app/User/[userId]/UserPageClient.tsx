"use client";
import React from "react";
import Container from "@/components/Container";
import UserAvatar from "@/components/UserAvatar";
import { SafeUser, SafeActivities } from "@/app/types";
import ActivityCard from "@/components/activities/ActivityCard";
import axios from "axios";
import toast from "react-hot-toast";
interface UserPageProps {
  currentUser: SafeUser | null;
  activities: SafeActivities[];
}

const UserPage: React.FC<UserPageProps> = (
  { 
    currentUser,
    activities
   }) => {
  if (!currentUser) {
    return null;
  }
  
  

  return (
    <Container>
      <div className="flex flex-col gap-4 p-4 rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <div className="">
            <UserAvatar src={currentUser?.image} />
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
              {currentUser?.name}
            </div>

            <div
              className="
            font-light 
          text-neutral-500"
            >
              {currentUser?.email}
            </div>
            <div
              className="
            font-light 
          text-neutral-500"
            >
              {currentUser?.phoneNumber}
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
          <div> {currentUser.description 
                  ? currentUser.description 
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
            currentUser={currentUser}
            data={activity}
          />
        )) : (
          <div>No activities found for this user.</div>
        )}
      </div>
        <hr />
        <div>view reviews here</div>
      </div>
    </Container>
  );
};

export default UserPage;
