import React from 'react'

import './dashboard.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import WishCard from './WishCard'


const Dashboard:React.FC = () => {
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
                Firstname: <span>Sumaila</span>
              </li>
              <li className="list-item">
                Lastname: <span>Iddrisu</span>
              </li>
              <li className="list-item">
                Email: <span>sumaila129@gmail.com</span>
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