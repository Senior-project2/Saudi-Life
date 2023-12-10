import { Bookings, Listings, User, Review } from "@prisma/client"
import { type } from "os";

export type SafeActivities = Omit<
Listings,
"createdAt"
> & {
    createdAt: string;
}

export type SafeUser = Omit <
User,
"createdAt" | "updatedAt" | "emailVerified" > & {
    createdAt: string;
    updatedAt: string;
    emailVerified: string | null;
}

export type SafeBookings = Omit<
Bookings,
"createdAt" | "listing"
> & {
    createdAt: string;
    listing: SafeActivities
    userName: string;
}
export type SafeReviews = Omit<
Review,
 "createdAt" | "updatedAt" | "authorId" | "reviewedUserId"
 > & {
    createdAt: string;
    updatedAt: string;
    author: SafeUser; 
    reviewedUser: SafeUser; 
};