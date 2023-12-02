import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { name, email, phoneNumber, image, description } = body;


    try {
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { name, email, phoneNumber, image, description },
        });

        return NextResponse.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        return NextResponse.error();
    }
}
