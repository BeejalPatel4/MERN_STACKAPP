




import React from 'react';
import profileImg from '../assets/images/shinminjeong.jpg';
import { useLoaderData } from 'react-router-dom';

export default function RecipeDetails() {
  const recipe = useLoaderData();

  // 🎨 Styles
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "3rem",
    background: "linear-gradient(to right, #fdf6f0, #e0f7fa)",
    width: "2028px",
  };

  const containerStyle = {
    display: "flex",
    gap: "2rem",
    // maxWidth: "1000px",
    
    backgroundColor: "#fff",
    borderRadius: "24px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
    fontFamily: "Segoe UI, sans-serif",
    padding: "2rem",
  };

  const leftSideStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
  };

  const rightSideStyle = {
    flex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    justifyContent: "flex-start",
  };

  const profileStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "1rem",
    // backgroundColor: "#f7f7f7",
    padding: "0.75rem 1.25rem",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  };

  const avatarStyle = {
    borderRadius: "50%",
    objectFit: "cover",
    width: "50px",
    height: "50px",
  };

  const titleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    textAlign: "center",
    color: "#ff6f61",
    margin: "1rem 0",
  };

  const imageStyle = {
    width: "100%",
    maxWidth: "320px",
    height: "auto",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    marginBottom: "1.5rem",
  };

  const sectionStyle = {
    backgroundColor: "#fefefe",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  };

  const headingStyle = {
    fontSize: "1.25rem",
    color: "#444",
    marginBottom: "0.75rem",
    fontWeight: "600",
  };

  const listStyle = {
    paddingLeft: "1.5rem",
    marginTop: 0,
  };

  const listItemStyle = {
    marginBottom: "0.5rem",
    fontSize: "1rem",
    color: "#333",
    lineHeight: "1.5",
  };

  const instructionsStyle = {
    display: "block",
    lineHeight: "1.6",
    fontSize: "1rem",
    color: "#555",
    whiteSpace: "pre-wrap",
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {/* 📸 Left Side */}
        <div style={leftSideStyle}>
          <div style={profileStyle}>
            <img src={profileImg} alt="Profile" style={avatarStyle} />
            <h5>{recipe.email}</h5>
          </div>
          <h3 style={titleStyle}>{recipe.title}</h3>
          <img
            src={`http://localhost:3000/images/${recipe.coverImage}`}
            alt="Recipe"
            style={imageStyle}
          />
        </div>

        {/* 📋 Right Side */}
        <div style={rightSideStyle}>
          <div style={sectionStyle}>
            <h4 style={headingStyle}>Ingredients</h4>
            <ul style={listStyle}>
              {recipe.ingredients.map((item, index) => (
                <li key={index} style={listItemStyle}>🍽 {item}</li>
              ))}
            </ul>
          </div>

          <div style={sectionStyle}>
            <h4 style={headingStyle}>Instructions</h4>
            <span style={instructionsStyle}>🍽 {recipe.instructions}</span>
          </div>
          {recipe.video && (
  <iframe
    src={
      recipe.video.startsWith("http")
        ? recipe.video.replace("watch?v=", "embed/")
        : `https://www.youtube.com/embed/${recipe.video}`
    }
    title="Recipe Video"
    style={videoStyle}
    allow="autoplay; fullscreen"
    allowFullScreen
  />
)}

        </div>
      </div>
    </div>
  );
}


const videoStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "14px",
  border: "none",
  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
};



