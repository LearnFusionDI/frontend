import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import './home.css'
import Hero from '../../components/Hero/Hero'
import Category from '../../components/Category/Category'
import CardList from '../../components/CardList/CardList'
import Footer from '../../components/Footer/Footer'

const Home: React.FC = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Category />
      <CardList />
      <div>

      </div>
      <Footer />
    </main>
  )
}

export default Home