import React from 'react'
import coarseImage from '../../../images/coarseImage.png'

import './card.css'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
  course: {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
  }
}

interface Course {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
  }

const Card: React.FC<Props> = ({ course, }) => {
  const navigate = useNavigate();

  const viewCourse = (course: Course) => {
    sessionStorage.setItem('courseId', course.courseId);
    sessionStorage.setItem('course', JSON.stringify(course));
    navigate(`/course/${encodeURIComponent(course.courseId)}`);
  }
  return (
    <div className="card">
      <div className="image">
        <img src={course.courseImage} alt="" />
      </div>
      <div className="text-content">
        <p className="platform">{course.coursePlatform}</p>
        <h3>{course.courseTitle.substring(0, 70)}</h3>
        {/* <p>{course.courseDescription.substring(0,50)}</p> */}
        <button className="button" onClick={() => viewCourse(course)}>
          view course
        </button>
      </div>
    </div>
  );
};

export default Card