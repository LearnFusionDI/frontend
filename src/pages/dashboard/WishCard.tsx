import React from 'react'
import coarseImage from "../../images/coarseImage.png";

interface Props {
  course: {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
  };
}

const WishCard: React.FC<Props> = ({ course }) => {
  return (
    <div className="wish-card">
      <div className="card-image">
        <img src={coarseImage} alt="" />
      </div>
      <div className="card-text">
        <h6>{course.courseTitle}</h6>
        <p>{course?.courseDescription}</p>
        <div className="card-btn">
          <button>view coarse</button>
          <button>Remove</button>
        </div>
      </div>
    </div>
  );
};

export default WishCard