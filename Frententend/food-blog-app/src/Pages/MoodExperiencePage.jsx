



import React, { useState, useEffect } from 'react';

const moodData = {
  cozy: {
    emoji: '😋',
    recipes: [
      "Creamy Tomato Soup",
      "Masala Khichdi",
      "Cinnamon Cocoa Porridge"
    ],
    audio: "Lo-fi Kitchen Beats"
  },
  fresh: {
    emoji: '🥗',
    recipes: [
      "Avocado Citrus Salad",
      "Yogurt Chickpea Wrap",
      "Mint Quinoa Bowl"
    ],
    audio: "Breezy Acoustic Mornings"
  },
  spicy: {
    emoji: '🌶️',
    recipes: [
      "Spicy Mango Tacos",
      "Szechuan Pepper Noodles",
      "Chili Nacho Stack"
    ],
    audio: "Latin-Bhangra Fire Mix"
  }
};

export default function MoodExperiencePage() {
  const [activeMood, setActiveMood] = useState(null);
  const [surpriseRecipe, setSurpriseRecipe] = useState("");
  const [audioVibe, setAudioVibe] = useState("");
  const [emojiBurst, setEmojiBurst] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes drop {
        0% { top: -50px; opacity: 0; transform: scale(0.8) rotate(0deg); }
        30% { opacity: 1; }
        50% { transform: scale(1.1) rotate(180deg); }
        100% { top: 100vh; opacity: 0; transform: scale(1) rotate(360deg); }
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const revealMoodExperience = (mood) => {
    setActiveMood(mood);
    const { emoji, recipes, audio } = moodData[mood];
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    setSurpriseRecipe(randomRecipe);
    setAudioVibe(audio);

    let dropCount = 0;
    const dropInterval = setInterval(() => {
      const emojiObj = {
        id: Date.now() + Math.random(),
        emoji,
        left: `${Math.random() * 100}vw`
      };
      setEmojiBurst(prev => [...prev, emojiObj]);
      dropCount++;
      if (dropCount >= 40) {
        clearInterval(dropInterval);
        setTimeout(() => setEmojiBurst([]), 3000);
      }
    }, 100);
  };

  const spinMoodWheel = () => {
    setIsSpinning(true);
    setTimeout(() => {
      const moods = Object.keys(moodData);
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      revealMoodExperience(randomMood);
      setIsSpinning(false);
    }, 1500);
  };

  const getMoodColor = (mood) => {
    return mood === 'cozy' ? '#0ef1f9ff'
         : mood === 'fresh' ? '#76e17dff'
         : mood === 'spicy' ? '#f14343ff'
         : 'white';
  };

  if (isSpinning) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255,255,255,0.85)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        zIndex: 9999
      }}>
        <div style={{
          fontSize: '3rem',
          animation: 'spin 1s linear infinite'
        }}>
          🎯
        </div>
        <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#333' }}>
          Spinning your mood magic...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      position: 'relative',
      height: '100vh',
      background:'linear-gradient(135deg, #03756eff,#ace0f9)',
      color: '#fff',
      fontFamily: 'Segoe UI, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '5rem',
      marginTop:'20px',
      borderRadius:'30px'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem',color: '#111' }}>🍴 Mood-Based Food Magic</h1>

      {/* Spinner Button */}
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{color: '#111'}}>🎯 Mood Flavor Spinner</h2>
        <button onClick={spinMoodWheel}
          style={{ padding: '10px 20px', marginTop: '1rem', fontSize: '1rem', borderRadius: '8px', background:' linear-gradient(to right, #24daee, #36d8ca, #dd3675, #b44593)', color: '#111' }}>
          Spin the Flavor Wheel 🎡
        </button>
      </section>

      {/* Manual Mood Picker */}
      <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{color: '#111'}}>🍽️ Pick Your Mood</h2>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
          <button onClick={() => revealMoodExperience('cozy')} style={moodButtonStyle}>😋 Cozy Comfort</button>
          <button onClick={() => revealMoodExperience('fresh')} style={moodButtonStyle}>🥗 Light & Fresh</button>
          <button onClick={() => revealMoodExperience('spicy')} style={moodButtonStyle}>🌶️ Spicy Adventure</button>
        </div>
      </section>

      {/* Surprise Recipe */}
      {surpriseRecipe && (
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <p style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: getMoodColor(activeMood),
            transition: 'all 0.6s ease',
            transform: 'scale(1.05)'
          }}>
            🍴 Try This: {surpriseRecipe}
          </p>
        </section>
      )}

      {/* Audio Vibe */}
      {audioVibe && (
        <section style={{ textAlign: 'center' }}>
          <h2>🎧 Soundtrack</h2>
          <p style={{
            fontSize: '1.2rem',
            fontWeight: '500',
            color: getMoodColor(activeMood),
            marginBottom: '1rem'
          }}>
            Suggested Vibe: {audioVibe}
          </p>
        </section>
      )}

      {/* Emoji Rain */}
      {emojiBurst.map((item) => (
        <div
          key={item.id}
          style={{
            position: 'fixed',
            top: '-50px',
            left: item.left,
            fontSize: '2.5rem',
            animation: 'drop 4s ease-out forwards',
            zIndex: 1000,
            pointerEvents: 'none'
          }}
        >
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

const moodButtonStyle = {
  padding: '10px 20px',
  borderRadius: '6px',
  fontSize: '1.2rem',
  background: '#12eae3',
  color: '#111',
  cursor: 'pointer'
};
