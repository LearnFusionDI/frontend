import React, { ChangeEvent, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import CardList from '../../components/CardList/CardList'
import { FiSearch } from 'react-icons/fi';

import './search.css'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../service/config';

interface Course {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  courseImage: string;
  coursePlatform: string;
  courseUrl: string;
}

const Search:React.FC = () => {
  const [searchValue, setSearchValue] =  useState<string>('');
  const [courses, setCourse] = useState<Array<Course>>();

   function useQuery() {
     return new URLSearchParams(useLocation().search);
   }

   const query = useQuery();

   const [queryValue, setQueryValue] = useState<string | null>(query.get("q"));
   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
     setSearchValue(event.target.value);
   };

   const getSearchCourse = async () => {
    if (searchValue) {
      setQueryValue(searchValue);
    } else {
      setQueryValue(query.get("q"));
    }
      axios
        .get(`${baseUrl}/course/read?searchQuery=${queryValue}`)
        .then((res) => {
          setCourse(res.data.data);
        })
        .catch((error) => {
          console.log(error.error);
        });
   };

   useEffect(() => {
     if (query.get("q")) {
       getSearchCourse();
     }
   }, []);

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
                <button onClick={() => getSearchCourse()}>
                  <FiSearch />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="card-list-title container">{`Search Result for : ${queryValue}`}</h3>
      <CardList courses={courses} />
    </main>
  );
}

export default Search