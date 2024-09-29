import React from 'react'
import { Link } from 'react-router-dom';

import './logo.css'

const Logo:React.FC = () => {
  return (
    <Link to={"/"} className="brand">
      <div className="shape">LF</div>
      <span className="text">LearnFusion</span>
    </Link>
  );
}

export default Logo