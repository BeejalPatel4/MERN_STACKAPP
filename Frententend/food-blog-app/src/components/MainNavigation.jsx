import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'
import Carousel from '../Pages/Carousel'
import FoodInfoPage from '../Pages/FoodInfoPage'
import MoodExperiencePage from '../Pages/MoodExperiencePage'
import AgentChat from '../Pages/AgentChat'



// import AddReview from './Addreview'

export default function MainNavigation() {
  return (
   <>
    <Navbar/>
    <Carousel></Carousel>

    <Outlet/>
    
    <FoodInfoPage />
     <MoodExperiencePage />
     <AgentChat />
    <Footer/>
   </>
  )
}
