import {NextResponse} from "next/server"
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"

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
        activityDate
    } = body;
    const listings = await prisma.listings.create({
        data: {
        category,
        locationValue: location.value,
        guestCount,
        imageSrc,
        price: parseInt(price, 10),
        title,
        description,
        userId: currentUser.id,
        activityDate: new Date(activityDate)
        }
    })
    if(listings){
        return NextResponse.json(listings);
        }
        else {
        return NextResponse.error();
        }
}