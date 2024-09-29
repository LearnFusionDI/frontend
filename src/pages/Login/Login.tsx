import React from 'react'

import './login.css'
import Logo from '../../components/Logo/Logo'
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="login">
      <div className="left container">
        <Logo />

        <div className="input-content">
          <h3>Welcome Back.</h3>
          <div className="input-group">
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <label htmlFor="">Password:</label>
            <input type="text" placeholder="Enter your password" />
          </div>

          <button >Login</button>

          <p className='dont-have-account'>Don't have account <Link to={'/register'}>Create here</Link></p>
        </div>
      </div>
      <div className="right"></div>
    </div>
  );
}

export default Login;