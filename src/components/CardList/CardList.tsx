import React, { useEffect, useState } from 'react'
import Card from './Card/Card'

import './cardlist.css'
import axios from 'axios';
import { baseUrl } from '../../service/config';

interface Coarses  {
    courseSchemaTitle: string,
    courseSchemaDescription: string,
    courseSchemaImage: string,
    courseSchemaPlatform: string,
    courseSchemaUrl: string,
}

const CardList:React.FC = () => {
  const [coarses, setCoarse] = useState<Coarses>();

  const getCoarse = async() => {
      axios.get(`${baseUrl}/course/read`).then(res => {
          console.log(res.data);
          setCoarse(res.data);
      })
      .catch(error => {

      })
  }

  useEffect(()=> {
      getCoarse();
  }, [])

  return (
    <div className="container">
      <h3 className='card-list-title'>Latest Coarses</h3>
      <div className="card-list">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default CardList