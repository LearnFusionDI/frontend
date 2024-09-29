import React from 'react'

import './register.css'
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';

const Register:React.FC = () => {
  return (
    <div className="register">
      <div className="right"></div>
      <div className="left container">
        <Logo />

        <div className="input-content">
          <h3>Register to Login.</h3>
          <div className="input-group">
            <label htmlFor="">Name:</label>
            <input type="text" placeholder="Enter your name" />
          </div>
          <div className="input-group">
            <label htmlFor="">Email:</label>
            <input type="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="">Password:</label>
            <input type="text" placeholder="Enter your password" />
          </div>

          <button>Register</button>

          <p className="dont-have-account">
            Already have account <Link to={"/login"}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register