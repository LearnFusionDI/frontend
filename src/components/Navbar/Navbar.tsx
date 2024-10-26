import React, { useEffect, useState } from 'react'
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';

import './navbar.css'
import Logo from '../Logo/Logo';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLoggedin, setIsLogin] = useState<boolean>(false);
    const navigate = useNavigate()

    const logoutUser = () => {
        const user = sessionStorage.getItem("user");
        if (user) {
          sessionStorage.removeItem('user');
          setIsLogin(false);
          navigate('/')
        }
    }

    useEffect(() => {
      const user = sessionStorage.getItem("user");
      if (user) {
          setIsLogin(true);
      }
}, []);

  return (
    <nav className="navbar">
      <Logo />
      <CiMenuFries className="toggle-btn" onClick={() => setIsOpen(!isOpen)} />

      <ul className={`navbar-list ${isOpen ? "active" : ""}`}>
        <div className="mobile-logo">
          <Link to={""} className="brand">
            <div className="shape">LF</div>
            <span className="text">LearnFusion</span>
          </Link>
          <MdClose
            className="toggle-close"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {!isLoggedin ? (
          <>
            <li className="navbar-item">
              <Link to={"/login"} className="navbar-link login-btn">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to={"/register"} className="navbar-link register-btn">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className="navbar-item">
            <button onClick={()=> logoutUser()} className="navbar-link logout-btn">
              Logout
            </button>
          </li>
        )}
      </ul>
      <div className={`overlay ${isOpen ? "active" : ""} `}></div>
    </nav>
  );
}

export default Navbar