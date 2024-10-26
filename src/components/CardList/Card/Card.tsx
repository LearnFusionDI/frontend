import React from 'react'
import coarseImage from '../../../images/coarseImage.png'

import './card.css'
import { Link } from 'react-router-dom'

interface Props {
  course: {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
  },
  // ?getCourse(param: string): void
}

const Card: React.FC<Props> = ({ course, }) => {

  return (
    <div className="card">
      <div className="image">
        <img src={course.courseImage} alt="" />
      </div>
      <div className="text-content">
        <p className="platform">{course.coursePlatform}</p>
        <h3>{course.courseTitle.substring(0, 70)}</h3>
        {/* <p>{course.courseDescription.substring(0,50)}</p> */}
        <Link className="button" to={`/course/${encodeURIComponent(course.courseId)}`}>
          view course
        </Link>
      </div>
    </div>
  );
};

export default Card