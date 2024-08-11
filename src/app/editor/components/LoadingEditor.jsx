import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationBuilder from './../../animations/animation-build-page.json';

const AnimationComponent = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: animationContainer.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationBuilder,
    });
  }, []);

  return (
    <div
      ref={animationContainer}
      style={{
        width: '50%',
        height: '50%', 
        textAlign: 'center',
      }}
    />
  );
};

export default AnimationComponent;
