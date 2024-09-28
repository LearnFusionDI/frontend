import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import './home.css'
// interface Props {
//   message: string;
// }

const Home: React.FC = () => {
  return (
    <main>
      {/* <div className='overlay'></div> */}
      <Navbar />
    </main>
  )
}

export default Home