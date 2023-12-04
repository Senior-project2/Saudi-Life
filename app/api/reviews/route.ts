import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { content, authorId, reviewedUserId } = body;

  try {
    const newReview = await prisma.review.create({
      data: {
        content,
        authorId,
        reviewedUserId
      },
    });

    return NextResponse.json(newReview);
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Unable to create review' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
