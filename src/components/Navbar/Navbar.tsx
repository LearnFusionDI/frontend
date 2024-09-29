import React, { useState } from 'react'
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { Link } from 'react-router-dom';

import './navbar.css'

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="navbar">
      <Link to={"/"} className="brand">
        <div className="shape">LF</div>
        <span className="text">LearnFusion</span>
      </Link>
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
      </ul>
      <div className={`overlay ${isOpen ? "active" : ""} `}></div>
    </nav>
  );
}

export default Navbar