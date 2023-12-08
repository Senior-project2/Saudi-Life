import {NextResponse} from "next/server"
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import set from "date-fns/set"

import { z } from 'zod';

const listingSchema = z.object({
    category: z.string().nonempty("Category is required"),
    location: z.object({
        value: z.string().nonempty("Location is required")
    }),
    guestCount: z.number().min(1, "Guest count must be at least 1"),
    imageSrc: z.string().nonempty("Image is required"),
    price: z.string().nonempty("Price is required").transform((price) => parseInt(price, 10)),
    title: z.string().nonempty("Title is required"),
    description: z.string().nonempty("Description is required"),
    activityDate: z.string().nonempty().refine(val => val ? new Date(val).toString() !== 'Invalid Date' : true, "Activity date is required and must be a valid date").transform(val => val ? new Date(val) : null),
    activityTime: z.string().nonempty()
});

export default listingSchema;


export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return NextResponse.error()
    }

    const body = await request.json()
    
    const {
        category,
        location,
        guestCount,
        imageSrc,
        price,
        title,
        description,
        activityDate,
        activityTime
    } = body;
    const parsedData = listingSchema.parse(body);
    const listings = await prisma.listings.create({
        data: {
            category: parsedData.category,
            locationValue: parsedData.location.value,
            guestCount: parsedData.guestCount,
            imageSrc: parsedData.imageSrc,
            price: parsedData.price,
            title: parsedData.title,
            description: parsedData.description,
            userId: currentUser.id,
            activityDate: parsedData.activityDate ? new Date(parsedData.activityDate) : null,
            activityTime: parsedData.activityTime,
        }
    })
    if(listings){
        return NextResponse.json(listings);
        }
        else {
        return NextResponse.error();
        }
}