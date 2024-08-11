'use client'
import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-web';
import lottieAnimation1 from '../../public/pumpkin.json'; 
import lottieAnimation2 from '../../public/halloween-eyes.json'; 
import lottieAnimation3 from '../../public/animation_lo99xuxx.json'; 
import lottieAnimation4 from '../../public/animation_lo99xzzr.json'; 

const Loading = () => {
  const [randomOption, setRandomOption] = useState(null);

  const animations = [lottieAnimation1, lottieAnimation2, lottieAnimation3, lottieAnimation4];
  const randomIndex = Math.floor(Math.random() * (animations.length + 1));

  useEffect(() => {
    if (randomIndex === 0) {
      setRandomOption('content');
    } else {
      setRandomOption('lottie');
      const selectedAnimation = animations[randomIndex - 1];

      const animation = Lottie.loadAnimation({
        container: document.getElementById('lottie-container'), 
        renderer: 'svg',
        animationData: selectedAnimation,
        loop: true,
        autoplay: true,
      });

      return () => {
        animation.stop();
      };
    }
  }, [randomIndex, animations]);

  return (
    <main className="flex flex-col gap-3">
      {randomOption === 'lottie' && (
        <div id="lottie-container" style={{ width: '200px', height: '200px' }}></div>
      )}
    </main>
  );
};

export default Loading;
