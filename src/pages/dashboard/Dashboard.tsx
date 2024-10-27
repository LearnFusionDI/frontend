import React, { useEffect, useState } from 'react'

import './dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WishCard from './WishCard'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosRequestConfig } from 'axios'
import { baseUrl } from '../../service/config'

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

    const getCourse = async (courseId : string) => {
      axios
        .get(`${baseUrl}/course/readByCourseId?courseId=${courseId}`)
        .then((res) => {
          if (res.data.data) {
            console.log(res.data)
          } else {
           console.log(res.data);
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
console.log(courses)
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
              <WishCard  course={course}/>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard