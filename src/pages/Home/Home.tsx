import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import './home.css'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import CourseSlider from '../../components/Slider/CourseSlider'
import axios from 'axios'
import { baseUrl } from '../../service/config'

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
   
   useEffect(()=> {
      getCourses();
   }, [])
  
   console.log(categories);
  return (
    <main className="main">
      <Navbar />
      <Hero />
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