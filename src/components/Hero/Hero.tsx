import React, { ChangeEvent, useState } from 'react'
import { FiSearch } from "react-icons/fi";

import './hero.css'
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const sendSearchValue = () => {
    console.log(searchValue)
    !searchValue ? navigate('/') :
        navigate(`/course/search?q=${searchValue}`)
  }

  return (
    <div className="hero">
      <div className="container hero-container">
        <div className="text-section">
          <h1>Welcome to Learn Fusion</h1>
          <p>
            The Platform that provide access to knowledge from anywhere in the
            world.
          </p>
        </div>
        <div className="search-section">
          <p>Find your next Course:</p>
          <div className="search-input">
            <input
              type="text"
              id="searchQuery"
              onChange={handleInputChange}
              name="searchQuery"
              placeholder="Search any coarse..."
            />
            <button onClick={() => sendSearchValue()}>
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