import React,{useEffect, useState} from 'react'
import Modal from './Modal';
import InputForm from './InputForm';
import logo from '../assets/images/logoicon.png'; // adjust path as needed
import { NavLink } from 'react-router-dom';

export default function Navbar() {

  const[isOpen,setIsOpen]=useState(false)
   let token=localStorage.getItem("token")
   const [isLogin,setIsLogin]=useState(token ? false : true)
   let user=JSON.parse(localStorage.getItem("user"))

   useEffect(() => {
    setIsLogin(token ? false:true)
   },[token])

  const checkLogin=()=>{

    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else{
      setIsOpen(true)
    }
  }
  return (
    <>
        <header>
            <h2>
    <img src={logo} alt="Logo" style={{ height: '50px', verticalAlign: 'middle', marginRight: '8px' }} />
    Food Recipe
  </h2>
          <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/myRecipe">MyRecipe</NavLink></li>
            <li><NavLink to="/favRecipe">Favorite</NavLink></li>
            <li onClick={checkLogin}><p className='login'>{(isLogin) ? "Login" : "Logout"}{user?.email ? `(${user?.email})`:" "}</p></li>
          </ul>
        </header>
        {(isOpen)&&<Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
    </>
  )
}
