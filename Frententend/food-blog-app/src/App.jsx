import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './Pages/Home'
import MainNavigation from './components/MainNavigation'
import axios from 'axios'
import AddFoodRecipe from './Pages/AddFoodRecipe'
import AddReview from './Pages/Addreview'
// import { Editepage } from './Pages/Editepage'
import EditRecipe from './Pages/EditRecipe'
import RecipeDetails from './Pages/RecipeDetails'
import AgentChat from './Pages/AgentChat'

import AgentChatt from './components/AgentChat'
const getAllRecipe=async()=>{
  let allRecipes=[]
  await axios.get('http://localhost:3000/recipe')
  .then(res=>{
    allRecipes=res.data
  })
  return allRecipes
}

const getMyRecipe=async() =>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipe()
  return allRecipes.filter(item=>item.createdby===user.id)
}

const getFavRecipes =()=>{
  return JSON.parse(localStorage.getItem("fav"))
}


const getRecipe=async({params})=>{
  let recipe;
  await axios.get(`http://localhost:3000/recipe/${params.id}`)
  .then(res=>recipe=res.data)

  // await axios.get(`http://localhost:3000/user/${recipe.createdBy}`)
  // .then(res=>{
  //   recipe={...recipe,email:res.data.email}
  // })

  return recipe
}

const router =createBrowserRouter([


{path:"/",element:<MainNavigation/>,children:[
  {path:"/Carousel",element:<Home></Home>},
  {path:"/",element:<Home/>,loader:getAllRecipe},
  {path:"/myRecipe",element:<Home/>,loader:getMyRecipe},
  {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
  {path:"/addrecipe",element:<AddFoodRecipe/>},
 {path: "/Addreview", element: <AddReview /> },
    { path: "/agent", element: <AgentChat /> },
   {path: "/editRecipe/:id", element: <EditRecipe /> },
   {path:"/recipe/:id",element:<RecipeDetails/>,loader:getRecipe}



]}

])


export default function App() {
  return (
  
    <>
    
       <RouterProvider router={router}></RouterProvider>
             <AgentChatt /> {/* Loads on every page */}

    </>
  )
}
