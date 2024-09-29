import React from 'react'
import coarseImage from '../../../images/coarseImage.png'

import './card.css'

const Card:React.FC = () => {
  return (
    <div className="card">
      <div className="image">
        <img src={coarseImage} alt="" />
      </div>
      <div className="text-content">
        <p className='platform'>Platform</p>
        <h3>This is the title of the caorse</h3>
        <p>This is the description off the coarse</p>
        <button className=''>view coarse</button>
      </div>
    </div>
  );
}

export default Card