import React, { useEffect, useState } from 'react'
import Card from './Card/Card'

import './cardlist.css'
import axios from 'axios';
import { baseUrl } from '../../service/config';
import data from '../../utils/coarses.json'
import { useLocation, useNavigate } from 'react-router-dom';


interface Coarses  {
    courseId: string,
    courseTitle: string,
    courseDescription: string,
    courseImage: string,
    coursePlatform: string,
    courseUrl: string,
}


const CardList:React.FC = () => {
  const [courses, setCourse] = useState<Array<Coarses>>();
  //const query = 'python';

  const navigate = useNavigate()

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  console.log(query.get('q'));

  const getCourses = async() => {
      axios
        .get(`${baseUrl}/course/get-started`)
        .then((res) => {
          setCourse(res.data.data);
        })
        .catch((error) => {
          console.log(error.error);
        });
  }

  const getSearchCourse = async() => {
      axios
        .get(`${baseUrl}/course/read?searchQuery=${query}`)
        .then((res) => {
          setCourse(res.data.data);
        })
        .catch((error) => {
          console.log(error.error);
        });
  }

    // const getCourse = async(courseId: string) => {
    //   const course = await courses?.find((course) => course.courseId === courseId);
    //   localStorage.setItem('course', JSON.stringify(course));
    //   const encodedId = encodeURIComponent(courseId);
    //   navigate(`/course/${encodedId}`);
    // };

    useEffect(()=> {
        if (query.get('q')) {
            getSearchCourse();
        } else {
            getCourses();
        }
    },[])

  return (
    <div className="container">
      <h3 className="card-list-title">Latest Coarses</h3>
      <div className="card-list">
        {courses?.map((course) => (
          <Card course={course} key={course.courseId} />
        ))}
      </div>
    </div>
  );
}

export default CardList