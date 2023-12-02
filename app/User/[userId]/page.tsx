import React from 'react';
import ClientOnly from '@/components/ClientOnly';
import EmptyState from '@/components/EmptyState';
import UserPage from './UserPageClient';
import getUserById from '@/app/actions/getUserById';
import getActivitiesByUserId from '@/app/actions/getActivityByUserId';
interface IParams {
    userId?: string;

}

const UserProfilePage= async ({ params }: { params: IParams}) => {
    const {userId} = params;
    if(!userId ) {
        return null
    }
    const user = await getUserById(userId);
    if (!user) {
        return null;
      }
    const userActivities = await getActivitiesByUserId({ userId: user.id });
    if (!user) {
        return (
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        );
    }

    return (
        <div>
            <UserPage 
            currentUser={user}
            activities={userActivities} />
        </div>
    );
};

export default UserProfilePage;