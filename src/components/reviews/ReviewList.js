import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings"
import { ReviewCard } from "./ReviewCard"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"


export const ReviewList = () => {
    const { reviews, getReviews, reviewId, setReviewId, displayReviews, setDisplayReviews, reviewPark } = useContext(ReviewContext)
    const [filteredReviews, setFiltered] = useState("")

    const history = useHistory()

    useEffect(() => {
        getReviews()
    }, [displayReviews])

    // whenever reviews changes, get all the reviews for the current park. Handle empty review array. 
    useEffect(() => {
        debugger
        const currentParkReviews = reviews.filter(review => review.parkId === parseInt(reviewPark?.id))
        const displayReviews = () => {
            if (currentParkReviews.length === 0) {
                return <h3>No Reviews yet...</h3>

            } else if (currentParkReviews.length !== 0) {
                return currentParkReviews.map(review => <ReviewCard key={review.id} review={review} />)
            }
        }
        setFiltered(displayReviews())
    }, [reviews])

    const handleAddReview = () => {
        if (sessionStorage.getItem(userStorageKey)) {
            history.push(`/parks/${reviewPark.id}/reviews/create`)
            setDisplayReviews(false)
        } else {
            window.alert("Please log in to add a review.")
        }
    }

    const handleCloseReviewModal = () => {
        setDisplayReviews(false)
    }

    return (
        <div className={displayReviews ? "modal is-active" : "modal"}>
            <div className="modal-background" onClick={handleCloseReviewModal}></div>
            <div className="modal-content">
                <div className="box">
                <h1 className="title">Reviews for: {reviewPark?.park_name}</h1>
                <section className="reviews">
                    {filteredReviews}
                </section>
            <button onClick={handleAddReview} className="button is-primary is-medium">Add Review</button>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" onClick={handleCloseReviewModal}></button>
        </div>
    )
}