

import React, { useRef, useEffect, useCallback, useState } from "react";
import foodRecipe from "../assets/foodRecipe.jpg";
// import recipe from "../assets/recipe1.jpg";
import RecipeItems from "../components/RecipeItems";
import { FaFacebook } from "react-icons/fa6";
import { ImTwitter } from "react-icons/im";
import { RiLinkedinFill } from "react-icons/ri";
import { GrGoogle } from "react-icons/gr";
import Wave from "react-wavify";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import AddReview from "../Pages/Addreview";
import Modal from "../components/Modal";
import InputForm from "../components/InputForm";

// import Carousel from "./Carousel";

export default function Home() {
  // const Navigete = useNavigate(4);

  const headingRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);
  const iconsRef = useRef([]);
  const waveRef = useRef(null);
  iconsRef.current = [];
const [isLoading, setIsLoading] = useState(true);

   const navigate =useNavigate()
   const [isOpen,setIsOpen]=useState(false)
   const addrecipe=()=>{
    let token=localStorage.getItem("token")
    if(token)
      
    navigate("/addrecipe")
    else{
      setIsOpen(true)
    }
   }

  const addToRefs = useCallback((el) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  }, []);



useEffect(() => {
  const loadingTimer = setTimeout(() => {
    setIsLoading(false);
  }, 1500); // Adjust timing as needed

  return () => clearTimeout(loadingTimer);
}, []);



  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(headingRef.current, { opacity: 0, y: -40, duration: 1 })
        .from(
          ".word",
          {
            opacity: 0,
            y: 30,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.1"
        )
        .from(
          btnRef.current,
          { opacity: 0, scale: 0.9, duration: 0.6 },
          "-=0.5"
        )
        .from(imgRef.current, { opacity: 0, x: 60, duration: 1 }, "-=0.6")
        .from(
          iconsRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,

            stagger: 0.2,
          },
          "-=0.8"
        )
        .from(
          waveRef.current,
          {
            opacity: 0,
            y: 100,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=1"
        );
    });

    gsap.to(btnRef.current, {
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power1.inOut",
    });

    return () => ctx.revert();
  }, []);

  const paragraph = `    A recipe is a formula of ingredients and a
    list of instructions for creating prepared foods. It is used to control quality, 
    quantity, and food costs in a foodservice operation. A recipe may be simple to complex based 
    on the requirements of the operation and the intended user.`;


if (isLoading) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}>
      {/* <div style={{
        border: "8px solid #b2dfdb",
        borderTop: "8px solid #00796b",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        animation: "spin 1s linear infinite"
      }} />
      <p style={{
        marginTop: "1.5rem",
        fontFamily: "Segoe UI, sans-serif",
        color: "#00796b",
        fontSize: "1.5rem"
      }}>
        Cooking up something delicious...
      </p>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style> */}

      <div style={{
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "linear-gradient(135deg, #fef6e4, #fde2ff)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  zIndex: 9999,
}}>
  <div style={{
    fontSize: "3rem",
    animation: "pulse 1.2s infinite",
  }}>
    🥘📚🍲
  </div>
  <p style={{ fontSize: "1.2rem", marginTop: "1rem", color: "#ff6f61" }}>
    Stirring up something tasty...
  </p>
  <style>
    {`
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.8; }
        50% { transform: scale(1.3); opacity: 1; }
        100% { transform: scale(1); opacity: 0.8; }
      }
    `}
  </style>
</div>

    </div>
  );
}




  return (
    <>
    
      <section className="home">
        <div className="left">
          <h1 ref={headingRef}>🍽️Food Recipi</h1>

          <h5 ref={descRef}>
            {paragraph.split(" ").map((word, index) => (
              <span key={index} className="word">
                {word}&nbsp;
              </span>
            ))}
          </h5>

          <button onClick={addrecipe} ref={btnRef}>
            Share Your Recipe
          </button>

          <div className="name">
            <ul>
              <li ref={addToRefs}>
                <a href="#">
                  <FaFacebook />
                </a>
              </li>
              <li ref={addToRefs}>
                <a href="#">
                  <ImTwitter />
                </a>
              </li>
              <li ref={addToRefs}>
                <a href="#">
                  <RiLinkedinFill />
                </a>
              </li>
              <li ref={addToRefs}>
                <a href="#">
                  <GrGoogle />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="right">
          <img
            ref={imgRef}
            src={foodRecipe}
            width="300px"
            height="300px"
            alt="Food Recipe"
            style={{
              borderRadius: "50%",
              // boxShadow: "0px 0px 10px 10px rgb(54, 241, 241)",
            }}
          />
        </div>
      </section>
      
      <div className="bg" ref={waveRef}>
        {/* <Wave
          fill="rgb(54, 241, 241)"
          paused={false}
          options={{
            height: 10,
            amplitude: 20,
            speed: 0.15,
            points: 3,
            
          }}
        /> */}
      </div> 
              {(isOpen)&&<Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
      
      <div className="recipe">
        
        <RecipeItems />
        <AddReview />
        
      </div>
    </>
  );
}
