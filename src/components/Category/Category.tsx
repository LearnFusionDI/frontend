import React from 'react'

import './category.css'

const Category:React.FC = () => {
  return (
    <div className='category'>
        <div className="container">
            <ul className='category-list'>
                <li><a>Engineering</a></li>
                <li><a>Machine Learning</a></li>
                <li><a>Deep Learning</a></li>
                <li><a>Mathematics</a></li>
                <li><a>Software Programming</a></li>
                <li><a>Nursing</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Category