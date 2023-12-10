"use client";
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import Modal from '../modals/Modal';
import CustomButton from '../CustomButton';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import ClientOnly from '../ClientOnly';
import EmptyState from '../EmptyState';
import { SafeReviews } from '@/app/types';
import { format, parseISO } from 'date-fns';

interface ReviewModalProps {
    authorId: string;
    reviewedUserId: string;
    existingReviews: SafeReviews[];
}

const reviewSchema = z.object({
    reviewContent: z.string().min(10, "Review must be at least 10 characters long").max(100, "Review must be no more than 100 characters long")
});

const ReviewModal: React.FC<ReviewModalProps> = ({
    authorId,
    reviewedUserId,
    existingReviews
    }
    ) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
     //Check if the current user has already reviewed this user
    const hasReviewed = existingReviews.some(review => review.author.id === authorId);

    const { register, 
        handleSubmit, 
        formState: { errors }, 
        reset } = 
        useForm({
        resolver: zodResolver(reviewSchema)
    });

    const handleAddReviewClick = () => {
        if (hasReviewed) {
            toast.error('You have already left a review for this user.');
        } else {
            setIsModalOpen(true);
        }
        
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleReviewSubmit = async (data: any) => {
        try {
            const response = await axios.post('/api/reviews', {
                content: data.reviewContent,
                authorId: authorId,
                reviewedUserId: reviewedUserId,
            });

            toast.success('Review submitted successfully');
            reset();
            setIsModalOpen(false);
        } catch (error) {
            toast.error('Failed to submit review');
        }
    };
   

    return (
        <>
           
                <CustomButton
                    onClick={handleAddReviewClick}
                    label="Add Review"
                />
            
            <Modal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleSubmit(handleReviewSubmit)}
                title="Add a Review"
                actionLabel="Submit Review"
                body={(
                    <textarea
                        {...register("reviewContent")}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Write your review here..."
                    />
                )}
            />
           
        </>
    );
};

export default ReviewModal;