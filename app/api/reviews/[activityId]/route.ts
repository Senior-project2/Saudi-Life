import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const activityId = url.searchParams.get('activityId');

  if (!activityId) {
    return new Response(JSON.stringify({ error: 'Activity ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: {
        activityId: activityId,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to fetch reviews' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
