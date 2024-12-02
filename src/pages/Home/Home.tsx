import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import './home.css'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import CourseSlider from '../../components/Slider/CourseSlider'
import axios from 'axios'
import { baseUrl } from '../../service/config'
import Card from '../../components/CardList/Card/Card'

interface Courses {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  coursePlatform: string;
  courseUrl: string;
}

const Home: React.FC = () => {
  const [categories, setCategeries] = useState<Courses[][]>()
  const [recommendCourses, setRecommendCourses] = useState<Courses[]>()

   const user = sessionStorage.getItem('user');
   const getCourses = async () => {
     axios
       .get(`${baseUrl}/course/get-started`)
       .then((res) => {
          setCategeries(res.data.data.category);
       })
       .catch((error) => {
         console.log(error.error);
       });
   };
   
   const getRecommendation = (userId:string) => {
      axios
       .get(`${baseUrl}/monitoring/getUserCourseRecommendation?userId=${userId}`)
       .then((res) => {
          console.log(res.data.data.course)
          setRecommendCourses(res.data.data.course);
       })
       .catch((error) => {
         console.log(error.error);
       });
   }
   
   useEffect(()=> {
      getCourses();

      if(user) {
        const userData = JSON.parse(user);
        getRecommendation(userData.userId);
      }
   }, [])

  return (
    <main className="main">
      <Navbar />
      <Hero />
      {recommendCourses && (
        <div className='container'>
          <h6>Recommended courses</h6>
          <div>
              <CourseSlider  courses={recommendCourses}/>
          </div>
        </div>
      )}

      {Object.entries(categories ?? []).map(([categoryKey, items]) => (
        <div className="container">
          <h6>{categoryKey}:</h6>
          <CourseSlider  courses={items}/>
        </div>
      ))}
      <Footer />
    </main>
  );
}

export default Home