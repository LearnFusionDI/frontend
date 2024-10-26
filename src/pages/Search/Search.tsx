import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import CardList from '../../components/CardList/CardList'
import { FiSearch } from 'react-icons/fi';

import './search.css'

const Search:React.FC = () => {
  return (
    <main>
      <Navbar />
      <div className="search">
        <div className="hero">
          <div className="container hero-container">
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
      </div>
      <CardList />
    </main>
  );
}

export default Search