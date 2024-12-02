import React, { useState } from 'react'

import './reviewform.css'
import { Formik,Field, Form, FormikHelpers, ErrorMessage } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { baseUrl } from '../../../service/config';
import { RestTypeNode } from 'typescript';

interface Review {
  courseId: string,
  userId: string,
  getReviews(arg: string): void
}


const ReviewSchema = Yup.object().shape({
  feedbackReview: Yup.string().required("Please enter a review"),
  feedbackRating: Yup.number().required("Please specify your rating")
});

interface Values {
  feedbackReview: string,
  feedbackRating: number
}

const ReviewForm:React.FC<Review> = ({courseId, userId, getReviews}) => {
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleSubmit = (review: Values) => {
      const reviewObj = {
          courseId: courseId,
          userId: userId,
          feedbackRating: review.feedbackRating,
          feedbackReview: review.feedbackReview
      }
      console.log(reviewObj)
      axios.post(`${baseUrl}/feedback/save`, reviewObj)
      .then((res) => {
        if(res.data.responseCode === "200") {
            setSuccessMessage(res.data.responseMessage);
            getReviews(courseId);
        }
      })
      .catch(error => {
        console.log(error.error);
      })
  }

  return (
    <div className='review-form'>
      <Formik
         initialValues={{
              feedbackReview: "",
              feedbackRating: 0,
            }}
            validationSchema={ReviewSchema}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>,
            ) => {
              handleSubmit(values);
              setSubmitting(false);
            }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className='review-input-group'>
               <label htmlFor="">Rating:</label>
                 <Field     
                   name="feedbackRating" 
                   as="select"
                   className={`${
                      errors.feedbackRating && touched.feedbackRating ? "invalid" : "valid-border"
                    }`}
                   >
                    <option value="">Select a rate</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Field>
                  <div className="error">
                    <ErrorMessage name="feedbackRating" />
                  </div>
            </div>
            <div className='review-input-group'>
                <label>Review Message:</label>
                <Field 
                  as="textarea" 
                  name="feedbackReview" 
                  id="" 
                  className={`${
                      errors.feedbackReview && touched.feedbackReview ? "invalid" : "valid-border"
                    }`}
                  rows={2}></Field>
                  <div className="error">
                    <ErrorMessage name="feedbackReview" />
                  </div>
            </div>
            <div className='button-section'>
                <button type='submit' className='review-submit'>Submit</button>
                <p className='success-message'>{successMessage}</p>
            </div>
          </Form>
        )}
        </Formik>
    </div>
  )
}

export default ReviewForm