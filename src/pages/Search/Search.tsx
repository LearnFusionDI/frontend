import React, { ChangeEvent, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import CardList from '../../components/CardList/CardList'
import { FiSearch } from 'react-icons/fi';

import './search.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Search:React.FC = () => {
  const [searchValue, setSearchValue] =  useState<string>('');
  const navigate = useNavigate();

   function useQuery() {
     return new URLSearchParams(useLocation().search);
   }

   const query = useQuery();

   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
     setSearchValue(event.target.value);
   };

   const sendSearchValue = () => {
     console.log(searchValue);
     !searchValue ? navigate("/") : navigate(`/course/search?q=${searchValue}`);
     window.location.reload();
   };

  return (
    <main>
      <Navbar />
      <div className="search">
        <div className="hero">
          <div className="container hero-container">
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
      </div>
      <h3 className="card-list-title container">{`Search Result of ${query.get(
        "q"
      )}`}</h3>
      <CardList />
    </main>
  );
}

export default Search