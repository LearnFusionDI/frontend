import React from 'react'

import './category.css'

const Category:React.FC = () => {
  return (
    <div className='category'>
        <div className="container">
            <ul className='category-list'>
                <li><a>Arts</a></li>
                <li><a>Data Sceince</a></li>
                <li><a>Finance</a></li>
                <li><a>Mathematics</a></li>
                <li><a>Programming</a></li>
                <li><a>Health</a></li>
                <li><a>Science</a></li>
                <li><a>Technology</a></li>
                <li><a>Personal Development</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Category