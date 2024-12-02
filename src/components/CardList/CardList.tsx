import React, { useEffect, useState } from 'react'
import Card from './Card/Card'

import './cardlist.css'


interface Course  {
    courseId: string,
    courseTitle: string,
    courseDescription: string,
    courseImage: string,
    coursePlatform: string,
    courseUrl: string,
}

interface Props {
  courses: Array<Course> | undefined;
}

const CardList:React.FC<Props> = ({courses}) => {

  return (
    <div className="container">
      <div className="card-list">
        {courses?.map((course) => (
          <Card course={course} key={course.courseId} />
        ))}
      </div>
    </div>
  );
}

export default CardList