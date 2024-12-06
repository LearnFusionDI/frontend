import React, { ChangeEvent, useState } from 'react'

import './reviewform.css'
import axios from 'axios';
import { baseUrl } from '../../../service/config';

interface Review {
  courseId: string,
  userId: string,
  getReviews(arg: string): void
}



const ReviewForm:React.FC<Review> = ({courseId, userId, getReviews}) => {
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [erroMessage, setErroMessage] = useState<string>("");
  const [feedbackRating, setFeedbackRating] = useState<string>("")
  const [feedbackReview, setFeedbackReview] = useState<string>("")

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      setFeedbackReview(event.target.value)
  }

  const handleRatingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFeedbackRating(event.target.value)
  }

  const getFeedFromLocal = (feedback:any) => {
      console.log(feedback)
      setFeedbackRating(feedback.rating);
      setFeedbackReview(feedback.review)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (feedbackRating === '' || feedbackReview === "") {
          setErroMessage("Please all Fields are required")
      }
      const reviewObj = {
          courseId: courseId,
          userId: userId,
          feedbackRating: feedbackRating,
          feedbackReview: feedbackReview
      }
 
      axios.post(`${baseUrl}/feedback/save`, reviewObj)
      .then((res) => {
        if(res.data.responseCode === "200") {
            setSuccessMessage(res.data.responseMessage);
            getReviews(courseId);
            setFeedbackRating('');
            setFeedbackReview('');
            localStorage.removeItem('feedback')
        }
      })
      .catch(error => {
        console.log(error.error);
      })
  }

  setTimeout(()=> {
    setSuccessMessage('')
  },2000)

  const feedBody = localStorage.getItem('feedback');

  return (
    <div className='review-form'>
        <form onSubmit={handleSubmit}>
          <div className='review-input-group'>
              <label htmlFor="">Rating:</label>
                <select     
                  name="feedbackRating" 
                  onChange={(event) => handleRatingChange(event)}
                  value={feedbackRating}
                  >
                  <option value="">Select a rate</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
          </div>
          <div className='review-input-group'>
              <label>Review Message:</label>
              <textarea 
                name="feedbackReview" 
                onChange={(event) => handleReviewChange(event)}
                value={feedbackReview}
                rows={2}></textarea>
          </div>
          <div className='button-section'>
              <button type='submit' className='review-submit'>Submit</button>
              {successMessage ? <p className='success-message'>{successMessage}</p> :
                <p className='error-message'>{erroMessage}</p> }
          </div>
        </form>
    </div>
  )
}

export default ReviewForm