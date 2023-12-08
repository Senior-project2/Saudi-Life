import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import {z} from "zod";
const validPhoneNumberPrefixes = ['50', '53', '55', '58', '59', '54', '56', '570', '571', '572', '576', '577', '578'];

const phoneNumberRegex = new RegExp(`^\\+966(${validPhoneNumberPrefixes.join('|')})\\d{7}$`);

const settingsSchema = z.object({
    name: z.string().nonempty("Name is required").min(2).max(30),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    phoneNumber: z.string().nonempty().refine((val) => {
        return val === undefined || (phoneNumberRegex.test(val) && val.length === 13);
    }, {
        message: `Phone number must be exactly 13 characters long, start with +966, and follow with these prefixes: ${validPhoneNumberPrefixes.join(', ')}`,
    }),
    image: z.string().optional(),
    description: z.string().min(10).max(200).trim().transform((str) => escape(str.trim()))
  });

export default settingsSchema;

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { name, email, phoneNumber, image, description } = body;
    const parsedData = settingsSchema.parse(body);


    try {
        const updatedUser = await prisma.user.update({
            where: { id: currentUser.id },
            data: { name: parsedData.name,
                    email: parsedData.email,
                    phoneNumber: parsedData.phoneNumber,
                    image: parsedData.image,
                    description: parsedData.description },
        });

        return NextResponse.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        return NextResponse.error();
    }
}
