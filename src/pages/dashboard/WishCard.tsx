import React from 'react'
import coarseImage from "../../images/coarseImage.png";
import { useNavigate } from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../service/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  course: {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
  };
  userId?: string | undefined;
  userToken: string | undefined;
  removeCourse(courseId: string, userId: string | undefined, userToken: string | undefined): void;
}

interface Course {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  coursePlatform: string;
  courseUrl: string;
}


const WishCard: React.FC<Props> = ({ course, userId, userToken, removeCourse }) => {
  const navigate = useNavigate();

  const viewCourse = (course: Course) => {
    sessionStorage.setItem("course", JSON.stringify(course));
    navigate(`/course/${encodeURIComponent(course.courseId)}`);
  };


  return (
    <div className="wish-card">
      <div className="card-image">
        <img src={course.courseImage} alt="" />
      </div>
      <div className="card-text">
        <h6>{course.courseTitle}</h6>
        <p>{course?.courseDescription}</p>
        <div className="card-btn">
          <button onClick={()=> viewCourse(course)}>view coarse</button>
          <button onClick={()=> removeCourse(course.courseId, userId, userToken)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default WishCard