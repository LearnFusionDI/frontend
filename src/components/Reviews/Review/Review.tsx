import React from 'react'
import moment from 'moment';

import './review.css'

interface Props {
    feedback: {
        feedbackCourseId: string,
        feedbackCreatedAt: string,
        feedbackRating: number,
        feedbackReview: string,
        feedbackStatus: string,
        feedbackUpdatedAt: string,
        feedbackUserId: string,
        userFirstName: string,
        userLastName: string
    },
    userId:string | undefined
}

const Review:React.FC<Props> = ({feedback, userId}) => {
  return (
    <div className=''>
        <div className='review'>
            <div className='review-user'>
                <div className='user-image'>{feedback.userFirstName[0]}{feedback.userLastName[0]}</div>
                <div className='user-name'>{feedback.userFirstName} <br /> {feedback.userLastName}</div>
            </div>
            <div className='review-message'>
                    {feedback.feedbackReview}
                <div className='edit-review'>
                    <p>{moment(feedback.feedbackCreatedAt).format("MMM Do YY")}</p>
                    {/* {feedback.feedbackUserId === userId &&
                    <div><a href="#">Edit</a></div>
                    } */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Review