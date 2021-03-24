import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { userStorageKey } from "../auth/authSettings"
import { ReviewCard } from "./ReviewCard"
import { ReviewContext } from "./ReviewProvider"
import "./Review.css"


export const ReviewList = () => {
    const { reviews, getReviews } = useContext(ReviewContext)
    const [filteredReviews, setFiltered] = useState("")
    const [ park, setPark ] = useState({})

    const { parkId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getReviews()
    }, [])

    // whenever reviews changes, get all the reviews for the current park. Handle empty review array. 
    useEffect(() => {
        const currentParkReviews = reviews.filter(review => review.parkId === parseInt(parkId))
        const displayReviews = () => {
            if (currentParkReviews.length === 0) {
                return <h3>No Reviews</h3>
            } else if (currentParkReviews.length !== 0) {
                setPark(currentParkReviews[0].park)
                return currentParkReviews.map(review => <ReviewCard key={review.id} review={review} />)
            }
        }
        setFiltered(displayReviews())
    }, [reviews])

    const handleAddReview = () => {
        if (sessionStorage.getItem(userStorageKey)) {
            history.push(`/parks/${parkId}/reviews/create`)
        } else {
            window.alert("Please log in to add a review.")
        }
    }

    return (
        <div className="column">
            <h1 className="title">Reviews for: {park.park_name}</h1>
            <section className="reviews">
                {filteredReviews}
            </section>
            <button onClick={handleAddReview} className="button is-primary is-large">Add Review</button>
        </div>
    )
}