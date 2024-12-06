import React, { useEffect, useState } from 'react'

import './reviews.css';
import Review from './Review/Review';
import ReviewForm from './ReviewForm/ReviewForm';
import axios from 'axios';
import { baseUrl } from '../../service/config';
import { useNavigate } from 'react-router-dom';

interface userSchema {
  userAuthToken: 'string',
  userCreatedAt: 'string',
  userDateOfBirth: 'string',
  userEmail: 'string',
  userFirstName: 'string',
  userId: 'string',
  userIsEmailVerified: boolean,
  userLastLoginTime: 'string',
  userLastName: 'string'
  userProfilePicture: 'string'
  userRole: 'string',
  userStatus: 'string'
  userUpdatedAt: 'string'
}

interface Props {
  courseId: string;
}

interface Review {
  courseId: string,
  userId: string,
  feedbackRating: string,
  feedbackReview: string
}

interface FeedbackResponse {
    feedbackCourseId: string,
    feedbackCreatedAt: string,
    feedbackRating: number,
    feedbackReview: string,
    feedbackStatus: string,
    feedbackUpdatedAt: string,
    feedbackUserId: string,
    userFirstName: string,
    userLastName: string
}

const Reviews:React.FC<Props> = ({courseId}) => {
  const [userData, setUserData] = useState<userSchema>();
  const [reviews, setReviews] = useState<Array<FeedbackResponse>>();

  const user = sessionStorage.getItem('user');
  const navigate = useNavigate();

  const getReviews = async (id: string) => {
     axios.get(`${baseUrl}/feedback/readCourseFeedback?courseId=${encodeURIComponent(id)}`)
       .then((res) => {
          setReviews(res.data.data.feedback);
       })
       .catch((error) => {
         console.log(error.error);
       });
   };

  const handleLoginClick = () => {
      sessionStorage.setItem('previousUrl', window.location.pathname);
      navigate('/login');
  };

  useEffect(() => {
      if(courseId) {
        getReviews(courseId);
      }

      if(user) {
        setUserData(JSON.parse(user))
      }
  },[courseId])

  const reviewCount = reviews ? reviews.length : 0;
  const rating = reviews ? reviews.reduce((total, feedback) => total + feedback.feedbackRating, 0) : 0;
  const averageRating = (rating / reviewCount).toFixed(1)

  return (
    <div className='container'>
        <div className='reviews-rating'>
          <h3 className='review-title'>Reviews({reviewCount})</h3>
          {reviewCount > 0 && 
            <h3 className='review-title'>Rating: {averageRating} / 5</h3>
          }
        </div>
        <hr/>
        
        {reviews?.map((feedback) => (
            <Review feedback={feedback} key={feedback.feedbackCreatedAt} userId={userData?.userId}/>
        ))}

        {userData?.userId ? (
          <>
            <h4 className='review-title'>Leave a Reviews</h4>
            <ReviewForm  courseId={courseId} userId={userData?.userId} getReviews={() => getReviews(courseId)}/>
          </>
        ) : (
        <>
          <a href='#' onClick={() => handleLoginClick()} className='review-link'>Leave a review</a>
        </>
      )}
    </div>
  )
}


export default Reviews