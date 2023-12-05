import prisma from "@/libs/prismadb";

interface IParams {
    userId?: string;
}

export default async function getUserReviews(params: IParams) {
    try {
        const { userId } = params;

        const reviews = await prisma.review.findMany({
            where: {
                reviewedUserId: userId,
            },
            include: {
                author: true, 
                reviewedUser: true,
            },
        });

        if (!reviews) {
            return [];
        }

        return reviews.map(review => ({
        ...review,
        createdAt: review.createdAt.toISOString(),
        updatedAt: review.updatedAt.toISOString(),
        author: {
            ...review.author,
            createdAt: review.author.createdAt.toISOString(),
            updatedAt: review.author.updatedAt.toISOString(),
            emailVerified: review.author.emailVerified?.toISOString() || null,
        },
        reviewedUser: { 
            ...review.reviewedUser,
            createdAt: review.reviewedUser.createdAt.toISOString(),
            updatedAt: review.reviewedUser.updatedAt.toISOString(),
            emailVerified: review.reviewedUser.emailVerified?.toISOString() || null,
           
        },
    }));

    } catch (error: any) {
        throw new Error(error.message);
    }
}
