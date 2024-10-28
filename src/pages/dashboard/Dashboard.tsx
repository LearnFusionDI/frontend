import React, { useEffect, useState } from 'react'

import './dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WishCard from './WishCard'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios'
import { baseUrl } from '../../service/config'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface userSchema {
  userAuthToken: 'string',
  userCreatedAt: 'string',
  userDateOfBirth: 'string',
  userEmail: 'string',
  userFirstName: 'string',
  userId: 'string',
  userIsEmailVerified: boolean,
  userLastLoginTime: 'string',
  userLastName: 'string'
  userProfilePicture: 'string'
  userRole: 'string',
  userStatus: 'string'
  userUpdatedAt: 'string'
}

interface Courses {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  coursePlatform: string;
  courseUrl: string;
}

const Dashboard:React.FC = () => {
   const [userData, setUserData] = useState<userSchema>();
   const [courses, setCourses] = useState<Array<Courses>>()

   const navigate = useNavigate()
   const user = sessionStorage.getItem("user");

   const fetchCourse = async () => {
    let userId, userAuthToken;
      if(user) {
        const userData = JSON.parse(user);
        userId = userData.userId;
        userAuthToken = userData.userAuthToken;
      }
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userAuthToken}`,
        },
      };
      axios.get(`${baseUrl}/course/readUserCourses?userId=${userId}`, config)
      .then((res) => {
          console.log(res.data);
          setCourses(res.data.data.course);
      })
      .catch((error) => {
        console.log(error.error)
      });
   }

    const removeCourse = async(courseId: string, userId:string | undefined, userToken:string | undefined) => {
      const data = {
        courseId,
        userId,
      };
      const config: AxiosRequestConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      axios
        .post(`${baseUrl}/course/remove`, data, config)
        .then((res) => {
          console.log(res.data);
          if (!res.data.error) {
            toast.success(res.data.responseMessage, {
              position: "top-right",
              autoClose: 3000, // milliseconds
            });
            fetchCourse();
          } else {
            toast.error(res.data.responseMessage, {
              position: "top-right",
              autoClose: 3000, // milliseconds
            });
          }
        })
        .catch((error) => {
          console.log(error.error);
        });
    };

   useEffect(() => {
     if (user) {
       setUserData(JSON.parse(user));
       fetchCourse()
     } else {
       navigate('/login');
     }
   }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <section className="section">
        <header className="header container">
          <h2>My Dashboard</h2>
        </header>

        <div className="container body-section">
          <div className="profile">
            {/* <h4>Profile Details</h4> */}
            <ul className="list-group">
              <li className="list-item">
                Firstname: <span>{userData?.userFirstName}</span>
              </li>
              <li className="list-item">
                Lastname: <span>{userData?.userLastName}</span>
              </li>
              <li className="list-item">
                Email: <span>{userData?.userEmail}</span>
              </li>
            </ul>
          </div>
          <div className="coarse-body">
            {/* <h4>Learn later</h4> */}
            {courses?.map((course) => (
              <WishCard  course={course} userId={userData?.userId} userToken={userData?.userAuthToken} removeCourse={removeCourse}/>
            ))}
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default Dashboard