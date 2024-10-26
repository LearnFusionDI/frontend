import React, { useEffect, useState } from 'react'
import Card from './Card/Card'

import './cardlist.css'
import axios from 'axios';
import { baseUrl } from '../../service/config';
import data from '../../utils/coarses.json'
import { useLocation } from 'react-router-dom';


interface Courses  {
    courseId: string,
    courseTitle: string,
    courseDescription: string,
    courseImage: string,
    coursePlatform: string,
    courseUrl: string,
}


const CardList:React.FC = () => {
  const [courses, setCourse] = useState<Array<Courses>>();
  const [arts, setArts] = useState<Array<Courses>>()
  const [dataScience, setDataScience] = useState<Array<Courses>>();
  const [finance, setFinance] = useState<Array<Courses>>()
  const [health, setHealth] = useState<Array<Courses>>()
  const [mathematics, setMathematics] = useState<Array<Courses>>()
  const [programming, setProgramming] = useState<Array<Courses>>()
  const [science, setScience] = useState<Array<Courses>>()
  const [technology, setTechnology] = useState<Array<Courses>>()
  const [personalDevelopment, setPersonalDevelopment] = useState<Array<Courses>>();


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  console.log(query.get("q"));

  const getCourses = async() => {
      axios
        .get(`${baseUrl}/course/get-started`)
        .then((res) => {
          const arts = res.data.data.category['Arts'];
          console.log(arts);
          const data_science = res.data.data.category["Data Science"];
          const finance = res.data.data.category['Finance'];
          const health = res.data.data.category['Health'];
          const mathematics = res.data.data.category['Mathematics'];
          const personal_development = res.data.data.category['Personal Development'];
          const programming = res.data.data.category['Programming'];
          const science = res.data.data.category['Science'];
          const technology = res.data.data.category['Technology'];
          setCourse(arts);
        })
        .catch((error) => {
          console.log(error.error);
        });
  }

  const getSearchCourse = async() => {
      axios
        .get(`${baseUrl}/course/read?searchQuery=${query.get("q")}`)
        .then((res) => {
          setCourse(res.data.data);
        })
        .catch((error) => {
          console.log(error.error);
        });
  }

    useEffect(()=> {
        if (query.get('q')) {
            getSearchCourse();
        } else {
            getCourses();
        }
    },[])

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