

import React, { useEffect, useRef, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BsFillStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import gsap from "gsap";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setallRecipe] = useState();
  const cardRefs = useRef([]);
  const hiddenTextRef = useRef(null);
  const [cardsReady, setCardsReady] = useState(false);
  let path = window.location.pathname === "/myRecipe" ? true : false;
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(false)
  const navigate = useNavigate();
  console.log(allRecipes)

  useEffect(() => {
    setallRecipe(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/recipe/${id}`)
      .then((res) => console.log(res));
    setallRecipe((recipes) => recipes.filter((recipe) => recipe._id !== id));
     let filterItem = favItems.filter(recipe => recipe._id !==id)
     localStorage.setItem("fav", JSON.stringify(filterItem))
  };

  const favRecipe = (item) => {
    let filterItem = favItems.filter(recipe => recipe._id !== item._id)
    favItems = favItems.filter(recipe => recipe._id === item._id).length === 0 ? [...favItems, item] : filterItem
    localStorage.setItem("fav", JSON.stringify(favItems))
    setIsFavRecipe(pre => !pre)
  }

  const joyfulQuotes = [
    "Made with love 🧡",
    "Seasoned with joy 🌶️",
    "A bite of happiness 🍴",
    "Spreading smiles 😋",
    "Joy in every flavor 🎉",
  ];

  useEffect(() => {
    if (hiddenTextRef.current) {
      gsap.fromTo(
        hiddenTextRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
    }

    if (cardsReady && cardRefs.current.length > 0) {
      gsap.from(cardRefs.current, {
        x: () => (Math.random() > 0.5 ? -100 : 100),
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
      });
    }
  }, [cardsReady]);

  const containerStyle = {
    background: "linear-gradient(135deg, #fff1eb, #ace0f9)",
    minHeight: "100vh",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  };

  const hiddenTextStyle = {
    fontSize: "1.1rem",
    color: "#444",
    textAlign: "center",
    maxWidth: "600px",
    marginTop: "10px",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginBottom: "0.5rem",
  };

  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    maxWidth: "1200px",
  };

  const cardStyle = {
    background: "radial-gradient(circle at top left, #ffffff, #f9f9f9)",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
    width: "260px",
    height: "310px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    overflow: "hidden",
    paddingBottom: "10px",
  };

  const imgStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  };

  const cardBodyStyle = {
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  };

  const titleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#333",
  };

  const quoteStyle = {
    fontStyle: "italic",
    fontSize: "0.9rem",
    color: "#777",
  };

  const iconsStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    fontSize: "1rem",
  };

  // Clear previous refs
  cardRefs.current = [];

  return (
    <div style={containerStyle}>
      {/* Welcome message with GSAP fade-in */}
      <div ref={hiddenTextRef} style={hiddenTextStyle}>
        adjust the card and bring the some joy in life 🍽️✨
      </div>

      <h1 style={headingStyle}>
        Enter some joy in your life with{" "}
        <span style={{ color: "#ff8a65" }}>FoodRecipe</span>
      </h1>

      <div style={gridStyle}>
        {allRecipes?.map((item, index) => (
          <div onDoubleClick={()=>navigate(`/recipe/${item._id}`)}
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
              if (index === allRecipes.length - 1) setCardsReady(true);
            }}
            style={cardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
          >
            <img
              src={`http://localhost:3000/images/${item.coverImage}`}
              style={imgStyle}
              alt="Food Preview"
            />
            <div style={cardBodyStyle}>
              <div style={titleStyle}>{item.title}</div>
              <div style={quoteStyle}>
                {joyfulQuotes[Math.floor(Math.random() * joyfulQuotes.length)]}
              </div>
              <div style={iconsStyle}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <BsFillStopwatchFill />
                  <span>{item.time || "N/A"}</span>
                </div>

                {(!path) ? 
                  <FaHeart onClick={() => favRecipe(item)}
                    style={{
                      color:( favItems.some(res => res._id === item._id)) ? "red": " ",
                    }}
                  />
                 : (
                  <div className="action">
                    <Link to={`/editRecipe/${item._id}`} className="editeIcon">
                      <FaEdit />
                    </Link>
                    <MdDelete
                      onClick={() => onDelete(item._id)}
                      className="deleteIcon"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
