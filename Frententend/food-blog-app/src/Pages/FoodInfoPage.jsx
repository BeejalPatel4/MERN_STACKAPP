// import React, { useEffect } from "react";
import React, { useState, useEffect } from "react";
export default function FoodInfoPage() {
 const categories = [
  {
    name: "Fruits",
    color: "#f78c6b",
    description: "Packed with vitamins and natural sugar.",
    link: "https://www.fruitsinfo.com",
  },
  {
    name: "Vegetables",
    color: "#90ee90",
    description: "Rich in fiber, antioxidants, and minerals.",
    link: "https://www.vegetables.co.nz",
  },
  {
    name: "Grains",
    color: "#f5deb3",
    description: "Main source of energy through carbs.",
    link: "https://wholegrainscouncil.org",
  },
  {
    name: "Proteins",
    color: "#ffcccb",
    description: "Builds and repairs body tissues.",
    link: "https://www.nutrition.org.uk/healthy-sustainable-diets/protein.html",
  },
  {
    name: "Dairy",
    color: "#d1c4e9",
    description: "Provides calcium for strong bones.",
    link: "https://www.usdairy.com",
  },
];


  const pageStyle = {
    fontFamily: "Arial, sans-serif",
    // background: "#f0f8ff",
    background:"linear-gradient(135deg, #fff1eb,#ace0f9)",
    padding: "2rem",
    minHeight: "100vh",
    borderRadius:"30px",
  };

  const sectionStyle = {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "2rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "0 auto",
  };

  // const categoryBox = {
  //   borderRadius: "8px",
  //   padding: "1rem",
  //   marginBottom: "1rem",
  //   color: "#333",
  //   boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  // };

const categoryBox = {
  borderRadius: "8px",
  padding: "1rem",
  marginBottom: "1rem",
  color: "#333",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, background 0.6s",
  position: "relative",
  overflow: "hidden",
};
const funFacts = [
  "Tomatoes were once considered poisonous in Europe and called 'love apples'!",
  "Bananas are berries, but strawberries aren't. Nature loves plot twists.",
  "Carrots were originally purple before orange took over the fashion scene.",
  "If you stare at broccoli long enough, it might start to look like a tiny tree.",
  "Grains got their name because no one wanted to call them 'tiny crunchy carbs'.",
  "Cows have best friends and get stressed when they're apart. Dairy drama is real.",
  "A cucumber is 96% water—basically the bottle of water that went to a spa.",
  "Some chefs use popcorn as garnish. It’s culinary chaos, and we love it.",
];

const getRandomFact = () =>
  funFacts[Math.floor(Math.random() * funFacts.length)];
const [funFact, setFunFact] = useState("");

useEffect(() => {
  setFunFact(getRandomFact());
}, []);

  return (
    <div style={pageStyle}>
      <div style={sectionStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "1rem", color: "#2b6777" }}>
          🧠 Learn About Food
        </h1>
        <p style={{ marginBottom: "2rem", lineHeight: "1.6", fontSize: "1rem" }}>
          Food provides the energy and nutrients we need to stay healthy. Different types of food
          play distinct roles in keeping our body strong, agile, and mentally sharp.
        </p>

        <h2 style={{ marginBottom: "1rem", color: "#333" }}>🍴 Categories of Food:</h2>
{/* 
        {categories.map((item) => (
          <div key={item.name} style={{ ...categoryBox, backgroundColor: item.color }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))} */}

        {categories.map((item) => (
  <a
    key={item.name}
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    style={{ textDecoration: "none" }}
  >
    {/* <div style={{ ...categoryBox, backgroundColor: item.color }}> */}
    <div
  style={{
    ...categoryBox,
    backgroundColor: item.color,
    backgroundImage: "radial-gradient(circle at top left, rgba(255,255,255,0.5), transparent)",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.02)";
    e.currentTarget.style.backgroundImage = "radial-gradient(circle at center, rgba(255,255,255,0.6), transparent)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.backgroundImage = "radial-gradient(circle at top left, rgba(255,255,255,0.5), transparent)";
  }}
>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  </a>
))}


       <h2 style={{ marginTop: "2rem", color: "#333" }}>🍕 Fun Fact:</h2>
<p style={{ fontStyle: "italic", color: "#555" }}>{funFact}</p>

      </div>
    </div>
  );
}

