


import React, { useState, useRef } from "react";
import { AiFillStar } from "react-icons/ai";

export default function AddReview() {
  const [reviewData, setReviewData] = useState({});
  const formRef = useRef(null);

  const onHandleChange = (e) => {
    const { name, value, files } = e.target;
    const val = name === "image" ? files[0] : value;
    setReviewData((prev) => ({ ...prev, [name]: val }));
  };

  const onStarClick = (index) => {
    setReviewData((prev) => ({ ...prev, rating: index + 1 }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   for (let key in reviewData) {
  //     formData.append(key, reviewData[key]);
  //   }

  //   try {
  //     const response = await fetch("http://localhost:3000/review", {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const data = await response.json();
  //     alert(data.message || "Review submitted successfully");
  //     setReviewData({});
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     alert("Something went wrong while submitting your review.");
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  for (let key in reviewData) {
    formData.append(key, reviewData[key]);
  }

  try {
    const response = await fetch("http://localhost:3000/review", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // Handles error codes like 404, 500, etc.
      const errorText = await response.text();
      throw new Error(`Server responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    alert(data.message || "Review submitted successfully");
    setReviewData({});
  } catch (error) {
    console.error("Error submitting review:", error);
    alert("Something went wrong while submitting your review.");
  }
};


  return (
    <div style={containerStyle}>
      {/* Left: Form Side */}
      <div style={formSideStyle}>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ width: "80%", maxWidth: "500px" }}
        >
          <h2 style={headingStyle}>Share Your Review 💬</h2>

          {/* Name Field */}
          <label style={labelStyle}>Your Name</label>
          <input
            type="text"
            name="name"
            value={reviewData.name || ""}
            onChange={onHandleChange}
            style={inputStyle}
            placeholder="Enter your name"
          />

          {/* Star Rating */}
          <label style={labelStyle}>Rating</label>
          <div style={starStyle}>
            {[...Array(5)].map((_, i) => (
              <AiFillStar
                key={i}
                onClick={() => onStarClick(i)}
                style={{ opacity: i < (reviewData.rating || 0) ? 1 : 0.3 }}
              />
            ))}
          </div>

          {/* Comment */}
          <label style={labelStyle}>Comment</label>
          <textarea
            name="comment"
            value={reviewData.comment || ""}
            onChange={onHandleChange}
            rows={4}
            style={{ ...inputStyle, resize: "none" }}
            placeholder="Share your thoughts..."
          />

          {/* Image Upload */}
          <label style={labelStyle}>Attach an Image</label>
          <input
            type="file"
            name="image"
            onChange={onHandleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
          💬 Submit Review
          </button> 
        </form>
      </div>

      {/* Right: Preview Side */}
      <div style={previewSideStyle}>
        {reviewData.image ? (
          <img
            src={URL.createObjectURL(reviewData.image)}
            alt="Preview"
            style={imageStyle}
          />
        ) : (
          <h3 style={placeholderStyle}>
            📷 Upload an image to preview your review!
          </h3>
        )}
      </div>
    </div>
  );
}


const containerStyle = {
  display: "flex",
  fontFamily: "sans-serif",
  minHeight: "90vh",
  // backgroundColor: "#fefefe",
   background: "linear-gradient(135deg, #fbe8e0ff, #ace0f9)",
};

const formSideStyle = {
  flex: 1,
  padding: "40px",
  // backgroundColor: "#fff",
   background: "linear-gradient(135deg, #fff1eb, #ace0f9)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius:"30px",
};

const previewSideStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  padding: "40px",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#24e7eeff",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "20px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "1rem",
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#90ebfbff",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  width: "100%",
};

const starStyle = {
  display: "flex",
  gap: "6px",
  fontSize: "1.5rem",
  color: "#644fffff",
  marginBottom: "20px",
  cursor: "pointer",
};

const imageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
  objectFit: "cover",
};

const placeholderStyle = {
  color: "#36d0d8ff",
  textAlign: "center",
};





  