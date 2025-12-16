

import { useRef, useEffect } from "react";
import gsap from "gsap";
import img1 from "../../src/assets/images/1.jpg";
import img2 from "../../src/assets/images/2.jpg";
import img3 from "../../src/assets/images/3.jpg";
import img4 from "../../src/assets/images/4.jpg";
import img5 from "../../src/assets/images/5.jpg";
import img6 from "../../src/assets/images/6.jpg";
import img7 from "../../src/assets/images/7.jpg";
import img8 from "../../src/assets/images/8.jpg";
import img9 from "../../src/assets/images/9.jpg";
import img10 from "../../src/assets/images/10.jpg";
import img11 from "../../src/assets/images/11.jpg";
import img12 from "../../src/assets/images/12.jpg";

export default function Carousel() {
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.from(itemsRef.current, {
      opacity: 1,
      y: 30,
      stagger: 0.3,
      duration: 1,
      ease: "power3.out"
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  // Inline style objects
  const styles = {
    carousel: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      padding: '20px 10px 60px',
      marginTop:'60px',
      background:"linear-gradient(135deg, #fff1eb,#ace0f9)" 
      // backgroundColor:'rgb(56, 244, 235)'
    },
    track: {
      display: 'flex',
      gap: '10px',
      marginbottom:'10px',
      animation: 'slide 50s linear infinite',
      width: '500px' // Based on number of items
    },
    item: {
      flex: '0 0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
       width: '500px'

    },
    img: {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      objectFit: 'cover',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
    }
  };

  return (
    <>
      {/* Keyframes as inline style via style tag */}
      <style>{`
        @keyframes slide {
          0% { transform: translateX(0%); }
          33% { transform: translateX(-100%); }
          66% { transform: translateX(-200%); }
          100% { transform: translateX(0%); }
        }
      `}</style>

      <div style={styles.carousel}>
        <div style={styles.track}>
          <div style={styles.item} ref={addToRefs}>
            <img src={img1} alt="Spicy Curry" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img2} alt="Fresh Salad" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img3} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img4} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img5} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img6} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img7} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img8} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img9} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img10} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img11} alt="Sweet Dessert" style={styles.img} />
          </div>
          <div style={styles.item} ref={addToRefs}>
            <img src={img12} alt="Sweet Dessert" style={styles.img} />
          </div>
        </div>
      </div>
    </>
  );
}



