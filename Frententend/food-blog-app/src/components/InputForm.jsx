




import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { gsap } from 'gsap';
import loginImage from '../assets/images/loginpage.png';

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (formRef.current && imageRef.current) {
      gsap.fromTo(
        [imageRef.current, formRef.current],
        { scale: 0.9, opacity: 0, y: -50 },
        { scale: 1, opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
      );
    }
  }, []);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignUp ? 'signup' : 'login';
     const response = await axios.post(`http://localhost:3000/${endpoint}`, { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setIsOpen();
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  }

  return (
    <div style={containerStyle}>
      <div style={imageWrapperStyle}>
        <img ref={imageRef} src={loginImage} alt="Login" style={imageStyle} />
      </div>
      <form ref={formRef} onSubmit={handleOnSubmit} style={formStyle}>
        <h2 style={headingStyle}>{isSignUp ? "Create Account" : "Welcome Back"} 👋</h2>

        <div style={fieldStyle}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            placeholder="you@example.com"
          />
        </div>

        <div style={fieldStyle}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" style={buttonStyle}>
          {isSignUp ? "Sign Up 📝" : "Login 🔐"}
        </button>

        {error && <div style={errorStyle}>{error}</div>}

        <p
          onClick={() => setIsSignUp(prev => !prev)}
          style={{ textAlign: 'center', marginTop: '20px', cursor: 'pointer', color: '#555' }}
        >
          {isSignUp ? "Already have an account?" : "Create new account"}
        </p>
      </form>
    </div>
  );
}

// 🎨 Styles

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  // alignItems: "center",
  background: "linear-gradient(to right, #24eee0ff, #36c8d8ff, #36bcddff, #45adb4ff)",
  fontFamily: "sans-serif",
  padding: "10px",
  minwidth: "80vh",
  // gap: "40px",
  // flexWrap: "wrap"
};

const imageWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const imageStyle = {
  width: "100%",
  maxWidth: "500px",
  height: "450px",
  borderRadius: "10px 10px 10px",
  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  objectFit: "cover"
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "10px 10px 9px",
  boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
  width: "100%",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column"
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "30px",
  color: "#36d0d8ff"
};

const fieldStyle = {
  marginBottom: "20px",
  display: "flex",
  flexDirection: "column"
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "1rem",
  boxShadow: "inset 2px 2px 6px rgba(0,0,0,0.05)"
};

const buttonStyle = {
  padding: "12px",
  backgroundColor: "#36cad8ff",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "background 0.3s"
};

const errorStyle = {
  color: "#b40000",
  marginTop: "10px",
  textAlign: "center",
  fontSize: "0.9rem"
};

