import React, { useEffect, useState } from 'react'

import './dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WishCard from './WishCard'
import { useNavigate } from 'react-router-dom'

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

const Dashboard:React.FC = () => {
   const [userData, setUserData] = useState<userSchema>();

   const navigate = useNavigate()

   useEffect(() => {
     const user = sessionStorage.getItem("user");
     
     if (user) {
       setUserData(JSON.parse(user));
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
            <WishCard />
            <WishCard />
            <WishCard />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Dashboard