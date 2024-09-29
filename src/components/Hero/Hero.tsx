import React from 'react'
import { FiSearch } from "react-icons/fi";

import './hero.css'

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <div className="container hero-container">
        <div className="text-section">
          <h1>Welcome to Learn Fusion</h1>
          <p>
            The Platform that provide access to knowledge from anywhere
            in the world.
          </p>
        </div>
        <div className="search-section">
          <p>Find your next Course:</p>
          <div className="search-input">
            <input type="text" placeholder="Search any coarse..." />
            <button>
              <FiSearch />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero