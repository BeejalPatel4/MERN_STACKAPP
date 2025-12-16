







import React, { useState, useEffect } from 'react';
import recipeVideo from "../assets/recipe.mp4";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const globalFlavorMessages = [
  "Explore recipes, stories, and spice from every corner of the globe.",
  "A taste of tradition meets modern delight.",
  "Savor flavors that span continents.",
  "From street food to five-star plates, it's all here.",
  "Every dish tells a story — make yours unforgettable.",
  "Discover comfort food reinvented across cultures.",
  "Food speaks every language — let's translate flavor.",
  "Recipes are passports to shared memory.",
  "Cooking is creativity you can taste.",
  "Global flavor, local heart — dig in!"
];

export default function Footer() {
  const [emojiBurst, setEmojiBurst] = useState([]);
  const [activeMood, setActiveMood] = useState(null);

  const randomMessage = globalFlavorMessages[Math.floor(Math.random() * globalFlavorMessages.length)];

  const triggerEmojiRain = (moodEmoji, moodName) => {
    setActiveMood(moodName); // track current mood
    let dropCount = 0;
    const dropInterval = setInterval(() => {
      const emoji = {
        id: Date.now() + Math.random(),
        emoji: moodEmoji,
        left: `${Math.random() * 100}vw`
      };
      setEmojiBurst(prev => [...prev, emoji]);
      dropCount++;
      if (dropCount >= 60) {
        clearInterval(dropInterval);
        setTimeout(() => setEmojiBurst([]), 4000);
      }
    }, 120);
  };

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes drop {
        0% {
          top: -50px;
          opacity: 0;
          transform: scale(0.8) rotate(0deg);
        }
        30% {
          opacity: 1;
        }
        50% {
          transform: scale(1.1) rotate(180deg);
        }
        100% {
          top: 100vh;
          opacity: 0;
          transform: scale(1) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const styles = {
    footer: {
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      color: 'white',
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:'30px'
    },
    backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
      opacity: 0.8
    },
    contentOverlay: {
      position: 'relative',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'space-between',
      width: '90%',
      maxWidth: '1100px',
      gap: '30px',
      padding: '40px 0',
    },
    section: {
      flex: '1',
      background: 'rgba(0, 0, 0, 0.65)',
      padding: '25px',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(6px)',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '12px'
    },
    flavorMessage: {
      transition: 'all 0.6s ease',
      fontWeight: '500',
      fontSize: '16px',
      marginBottom: '15px',
      color:
        activeMood === 'cozy'
          ? '#FFDAB9'
          : activeMood === 'fresh'
          ? '#B0F2B4'
          : activeMood === 'spicy'
          ? '#FF6B6B'
          : 'white',
      transform: activeMood ? 'scale(1.05) ' : 'none'
    },
    socialIcons: {
      display: 'flex',
      gap: '15px',
      marginTop: '20px',
      fontSize: '20px'
    },
    input: {
      width: '100%',
      marginBottom: '10px',
      padding: '10px',
      borderRadius: '6px',
      border: 'none'
    },
    button: {
      padding: '10px 20px',
      background: '#fff',
      color: 'rgb(20, 226, 202)',
      fontWeight: 'bold',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'background 0.3s'
    },
    copyright: {
      marginTop: '15px',
      fontSize: '14px'
    },
    burstEmoji: {
      position: 'fixed',
      top: '-50px',
      fontSize: '3rem',
      animation: 'drop 4.5s ease-out forwards',
      zIndex: 1000,
      pointerEvents: 'none'
    }
  };

  return (
    <section style={styles.footer}>
      <video autoPlay loop muted playsInline style={styles.backgroundVideo}>
        <source src={recipeVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={styles.contentOverlay}>
        <div style={styles.section}>
          <h2 style={styles.heading}>Flavor Unites the World</h2>
          <p style={styles.flavorMessage}>{randomMessage}</p>

          <p><strong>🍜 Around the World in One Bite:</strong> From street food in Mumbai to classic Parisian pastries, our recipes bring cultures together.</p>
          <p><strong>🎤 Did You Know?</strong> In South Korea, sharing kimchi is considered a gesture of friendship. In Italy, pasta shapes even carry emotional meaning!</p>
          <p><strong>📸 Share Your Dish:</strong> Tag us in your food creations and get featured! We're building a global plate of love and flavor.</p>

          <div style={styles.socialIcons}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaGithub /></a>
          </div>
        </div>

        <div style={styles.section}>
          <h3 style={styles.heading}>Stay in Touch</h3>
          <p>Today's badge: <strong>🌶️ Spice Explorer</strong></p>
          <p>Come back tomorrow for a new one!</p>

          <hr style={{ margin: '15px 0', borderColor: '#ffffff22' }} />
          <p><strong>Quick Tip:</strong> To bring out the flavor of herbs, add them towards the end of cooking.</p>

          <p style={{ marginTop: '15px' }}>🍽️ What's your food mood today?</p>
          <p>Pick a vibe And See Magic:</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={styles.button} onClick={() => triggerEmojiRain('😋', 'cozy')}>😋 Cozy Comfort</button>
            <button style={styles.button} onClick={() => triggerEmojiRain('🥗', 'fresh')}>🥗 Light & Fresh</button>
            <button style={styles.button} onClick={() => triggerEmojiRain('🌶️', 'spicy')}>🌶️ Spicy Adventure</button>
          </div>

          <p style={styles.copyright}>
            &copy; {new Date().getFullYear()} Bijal Patel. All rights reserved.
          </p>
        </div>
      </div>

      {emojiBurst.map((item) => (
        <div
          key={item.id}
          style={{
            ...styles.burstEmoji,
            left: item.left
          }}
        >
          {item.emoji}
        </div>
      ))}
    </section>
  );
}
