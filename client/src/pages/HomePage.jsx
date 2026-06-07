import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import HowItWorks from '../components/HowItWorks'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
        <Navbar />
        <Hero />
        <AiTools/>
        <HowItWorks/>
        <Testimonial/>
        <Plan/>
        <Footer/>
    </>
  )
}

export default HomePage