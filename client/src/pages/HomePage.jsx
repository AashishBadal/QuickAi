import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import HowItWorks from '../components/HowItWorks'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import Footer from '../components/Footer'

const HomePage = () => {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    // Wait for sections (and their reveal animations) to mount before scrolling.
    const id = hash.replace('#', '')
    const t = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(t)
  }, [hash])

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