import React from 'react'
import Card from './Card/Card'

import './cardlist.css'

const CardList:React.FC = () => {
  return (
    <div className="container">
      <h3 className='card-list-title'>Latest Coarses</h3>
      <div className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default CardList