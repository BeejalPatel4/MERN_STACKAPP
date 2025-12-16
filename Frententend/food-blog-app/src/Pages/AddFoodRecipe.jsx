


import axios from "axios";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  const [instructionInput, setInstructionInput] = useState("");
  const [instructionsList, setInstructionsList] = useState([]);
  const navigate = useNavigate();
  const formRef = useRef(null);
   
  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    const val = name === "file" ? files[0] : value;
    setRecipeData((prev) => ({ ...prev, [name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("video", recipeData.video);
    formData.append("file", recipeData.file);
    formData.append("ingredients", JSON.stringify(ingredientsList));
    formData.append("instructions", JSON.stringify(instructionsList));

    try {
      await axios.post("http://localhost:3000/recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Submission Error:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "sans-serif",
      minHeight: "90vh",
      backgroundColor: "#5ff8e8",
      boxSizing: "border-box",
    }}>
      {/* Left Side: Form */}
      <div style={{
        flex: 1,
        padding: "40px",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "1800px",
        borderRadius: "16px",
        marginLeft: "20px",
      }}>
        <form ref={formRef} onSubmit={onHandleSubmit} style={{ width: "80%", maxWidth: "500px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#24ebee" }}>
            Create a New Recipe 🍽️
          </h2>

          {/* Title */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Title</label>
            <input
              type="text"
              name="title"
              onChange={onHandleChange}
              style={inputStyle}
              placeholder="Enter title"
            />
          </div>

          {/* Time */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Time</label>
            <input
              type="text"
              name="time"
              onChange={onHandleChange}
              style={inputStyle}
              placeholder="e.g. 45 mins"
            />
          </div>

          {/* Ingredients */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Ingredients</label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                style={inputStyle}
                placeholder="Add ingredient"
              />
              <button type="button" style={buttonStyle}
                onClick={() => {
                  if (ingredientInput.trim()) {
                    setIngredientsList((prev) => [...prev, ingredientInput.trim()]);
                    setIngredientInput("");
                  }
                }}>+</button>
            </div>
            <ul>
              {ingredientsList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Instructions</label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                value={instructionInput}
                onChange={(e) => setInstructionInput(e.target.value)}
                style={inputStyle}
                placeholder="Add instruction step"
              />
              <button type="button" style={buttonStyle}
                onClick={() => {
                  if (instructionInput.trim()) {
                    setInstructionsList((prev) => [...prev, instructionInput.trim()]);
                    setInstructionInput("");
                  }
                }}>+</button>
            </div>
            <ol>
              {instructionsList.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          {/* Video Field */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Recipe Video ID or URL</label>
            <input
              type="text"
              name="video"
              onChange={onHandleChange}
              style={inputStyle}
              placeholder="e.g. vi5jC9kQs2I3PdmVBjgcIg45 or https://..."
            />
          </div>

          {/* Image Upload */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Recipe Image</label>
            <input type="file" name="file" onChange={onHandleChange} />
          </div>

          <button type="submit" style={buttonStyle}>📝 Publish Recipe</button>
        </form>
      </div>
      
         <div style={previewWrapperStyle}>
  <h4 style={previewHeadingStyle}>📷 Recipe Image Preview</h4>
  {recipeData.file ? (
    <img
      src={URL.createObjectURL(recipeData.file)}
      alt="Preview"
      style={imageStyle}
    />
  ) : (
    <p style={{ color: "#aaa", fontStyle: "italic", textAlign: "center" }}>
      No image uploaded
    </p>
  )}

  {recipeData.video && (
    <>
      <h4 style={previewHeadingStyle}>🎬 Recipe Video Preview</h4>
      <iframe
        src={
          recipeData.video.startsWith("http")
            ? recipeData.video.replace("watch?v=", "embed/")
            : `https://www.youtube.com/embed/${recipeData.video}`
        }
        title="Recipe Video"
        style={iframeStyle}
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </>
  )}
</div>

    </div>
  );
}



// const inputStyle = {
//   width: "100%",
//   padding: "10px",
//   borderRadius: "6px",
//   border: "1px solid #ccc",
//   fontSize: "1rem",
// };

// const buttonStyle = {
//   padding: "10px 14px",
//   backgroundColor: "#24ebee",
//   color: "#fff",
//   border: "none",
//   borderRadius: "6px",
//   fontWeight: "bold",
//   fontSize: "1rem",
//   cursor: "pointer"
// };

// const labelStyle = {
//   display: "block",
//   marginBottom: "5px",
//   fontWeight: "bold"
// };
const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "10px 14px",
  backgroundColor: "#24ebee",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer"
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold"
};

const previewWrapperStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "50px",
  backgroundColor: "#f9ffff",
  borderRadius: "16px",
  boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
  marginLeft: "20px",
};

const previewHeadingStyle = {
  marginBottom: "0.5rem",
  color: "#2b6777",
  textAlign: "center",
  fontSize: "1.2rem",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "300px",
  objectFit: "cover",
  borderRadius: "12px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
  marginBottom: "2rem",
};

const iframeStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "12px",
  border: "none",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
};



