
import prisma from "@/libs/prismadb";

export default async function getUserReviews(userId: string) {
    try {
        const reviews = await prisma.review.findMany({
            where: {
                reviewedUserId: userId
            },
            include: {
                author: true 
            }
        });

        const safeReviews = reviews.map(review => ({
            ...review,
            createdAt: review.createdAt.toISOString(),
            author: {
                id: review.author.id,
                name: review.author.name,
                image: review.author.image
            }
        }));

        return safeReviews;
    } catch (error: any) {
        throw new Error(error.message);
    }
}
