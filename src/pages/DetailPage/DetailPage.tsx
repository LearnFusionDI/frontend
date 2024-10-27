import React, { useEffect, useState } from 'react'

import './detail-page.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate} from 'react-router-dom';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../service/config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    axios
      .get(`${baseUrl}/course/readByCourseId?courseId=${courseData.courseId}`)
      .then((res) => {
        if (res.data.data) {
          setCourse(res.data.data);
        } else {
          setCourse(courseData);
        }
      })
      .catch((error) => {
          setCourse(courseData);
          console.log(error.error);
      });
  };

  const savesCourse = () => {
      const user = sessionStorage.getItem('user');
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
                  autoClose: 3000, // milliseconds
                });
                console.log(res);
            } else {
              toast.error(res.data.responseMessage, {
                position: "top-right",
                autoClose: 3000, // milliseconds
              });
            }
            
          })
          .catch((error) => {
            console.log(error.error);
            toast.error("Failed to submit form.");
          });
      } else {
        navigate('/login');
      }
      
  }

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
          <p>{course?.courseDescription}</p>
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
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default DetailPage