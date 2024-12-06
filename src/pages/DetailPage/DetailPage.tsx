import React, { useEffect, useState } from 'react'
import DOMPurify from 'dompurify';

import './detail-page.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate} from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../service/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reviews from '../../components/Reviews/Reviews';

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

  const navigate = useNavigate()
  let courseData: course;
  const courseString = sessionStorage.getItem("course");

  if (courseString) {
    courseData = JSON.parse(courseString);
  }

  const getCourse = async () => {

    setCourse(courseData);
    // axios
    //   .get(`${baseUrl}/course/readByCourseId?courseId=${x}`)
    //   .then((res) => {
    //     if (res.data) {
    //       console.log(res.data)
    //       setCourse(res.data);
    //     } else {
    //       setCourse(courseData);
    //     }
    //   })
    //   .catch((error) => {
    //       setCourse(courseData);
    //       console.log(error.error);
    //   });
  };
  const user = sessionStorage.getItem('user');
  const savesCourse = () => {
      if (user) {
        const userData = JSON.parse(user);
        const saveData = {
          courseId: course?.courseId,
          userId: userData.userId,
        };
        const config: AxiosRequestConfig = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.userAuthToken}`
          }
        };
        axios
          .post(`${baseUrl}/course/save`, saveData, config)
          .then((res) => {
            if (!res.data.error) {
                toast.success(res.data.responseMessage, {
                  position: "top-right",
                  autoClose: 3000,
                });

            } else {
              toast.error(res.data.responseMessage, {
                position: "top-right",
                autoClose: 3000,
              });
            }
            
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to submit form.");
          });
      } else {
        sessionStorage.setItem('previousUrl', window.location.pathname);
        navigate('/login');
      }
      
  }

  const sendMonitorCourse = async() => {
    if(user) {
      const userData = JSON.parse(user);
      const monitorCourseData = {
          monitorCourseId: courseData.courseId,
          monitorCourseTitle: courseData.courseTitle,
          monitorUserId: userData.userId,
          monitorAction: "MONITORING_UPDATE"
      }

      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userData.userAuthToken}`
        }
      };

      axios
          .post(`${baseUrl}/monitoring/saveCourseCheck`, monitorCourseData, config)
          .then((res) => {
            if(res.data.responseCode === '200') {
              console.log(res.data.responseMessage)
            }
          })
          .catch((error) => {
            console.log(error);
          });
    }
  }

  useEffect(() => {
      getCourse();
      setTimeout(()=>{
        sendMonitorCourse();
      }, 2000)
  }, []);

  const youtubeId = course?.coursePlatform === 'YOUTUBE' ? course.courseUrl.split('=')[1] : ''
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
            <Link
              className="button"
              target="_blank"
              to={`${course?.courseUrl}`}
            >
              View On site
            </Link>
            <button className="button watchLater" onClick={() => savesCourse()}>
                watch later
            </button>
          </div>
        </div>
        <hr />
        <div className="content">
          {(course?.coursePlatform === 'YOUTUBE' && youtubeId) &&
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?controls=1`}
              ></iframe>
          }
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(course?.courseDescription || '') }}
          />
        </div>
        <div>
          {course && 
            <Reviews courseId={course.courseId}/>
          }
          
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default DetailPage