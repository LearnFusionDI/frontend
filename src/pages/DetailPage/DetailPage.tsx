import React, { useEffect, useState } from 'react'

import './detail-page.css'
import Navbar from '../../components/Navbar/Navbar'
import coarseImage from "../../images/coarseImage.png";
import Footer from '../../components/Footer/Footer';
import data from "../../utils/coarses.json";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../service/config';

interface course {
    courseId: string;
    courseTitle: string;
    courseDescription: string;
    courseImage: string;
    coursePlatform: string;
    courseUrl: string;
};

const DetailPage:React.FC = () => {
  const [course, setCourse] = useState<course>();

  const params = useParams();
  const courseId = params.courseId ? params.courseId : '';
  console.log(decodeURIComponent(courseId));

  const getCourse = async () => {
    //const cons = await data.find((course) => course.courseId === courseId);
    const courseItem = await localStorage.getItem('course');
    
    // if (courseItem) {
    //   try {
    //     const parsedCourse: course = JSON.parse(courseItem);
    //     setCourse(parsedCourse); // Ensure the type matches
    //   } catch (error) {
    //     console.error("Failed to parse course item:", error);
    //   }
    // }
    axios
      .get(`${baseUrl}/course/readByCourseId?courseId=${decodeURIComponent(courseId)}`)
      .then((res) => {
        console.log(res.data.data);
        setCourse(res.data.data);
      })
      .catch((error) => {});
  };

  useEffect(() => {
      getCourse();
  }, []);


  return (
    <div className="details">
      <Navbar />
      <header
        className="detail-hero container"
        style={{
          backgroundImage: `url(${course?.courseImage})`,
          backgroundSize: "cover",
        }}
      ></header>
      <section className="container">
        <div className="title-section">
          <h4>{course?.courseTitle}</h4>
          <div className="button-section">
            <Link className='button' target='_blank' to={`${course?.courseUrl}`}>View On site</Link>
          </div>
        </div>
        <hr />
        <div className="content">
          <p>
            {course?.courseDescription}
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque, est
            odit quos ea eligendi accusantium assumenda aliquid architecto eius
            consectetur veritatis dolores? Harum quidem, excepturi incidunt,
            quaerat earum amet temporibus expedita qui maiores nobis eos
            corrupti iste consequatur sit reiciendis laudantium perferendis
            accusamus quod a? Aspernatur dignissimos accusantium repudiandae,
            amet mollitia blanditiis culpa expedita perspiciatis corporis sit
            voluptatem veritatis laudantium quibusdam ea aliquam beatae, quae
            fugit natus corrupti ad dicta quidem placeat sunt soluta. Esse
            maiores dolorum quo eos itaque repudiandae optio exercitationem ab,
            modi eius delectus, sed impedit expedita et magnam minima! Ullam ab
            fuga, nulla perspiciatis alias modi?
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default DetailPage