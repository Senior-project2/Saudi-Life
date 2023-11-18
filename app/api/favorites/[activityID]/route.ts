import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams {
  activityID?: string;
}

export async function POST(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { activityID } = params;

  if (!activityID || typeof activityID !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(activityID);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { activityID } = params;

  if (!activityID || typeof activityID !== 'string') {
    throw new Error('Invalid ID');
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== activityID);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}