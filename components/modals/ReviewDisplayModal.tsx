"use client"
import React, { use } from 'react'
import Modal from './Modal'
import useDisplayReviewsModal from '@/app/hooks/useDisplayReviewsModal'
import { SafeReviews } from '@/app/types'
interface ReviewDisplayModalProps {
    reviews: SafeReviews[];
}

const ReviewDisplayModal: React.FC<ReviewDisplayModalProps> = ({
    reviews
}) => {
    const useReviewModal = useDisplayReviewsModal()
    const onSubmit = () =>{
        
            useReviewModal.onClose()
        
    }
    



    let bodyContent = (
        <div className="reviews-list">
        {reviews.map(review => (
            <div key={review.id} className="review-item">
                <div className="review-content">{review.content}</div>
                <div className="review-author">Reviewed by: {review.author.name}</div>
                <div className="review-date">On: {review.createdAt}</div>
                
            </div>
        ))}
    </div>
    )
  return (
    <Modal
    isOpen={useReviewModal.isOpen}
    onClose={useReviewModal.onClose}
    onSubmit={onSubmit}
    actionLabel="Close"
    body={bodyContent}
    />
  )
}

export default ReviewDisplayModal