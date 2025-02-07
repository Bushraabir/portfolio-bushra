import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import loaderAnimation from '../assets/animation/loader1.json'; 

const Loader1 = ({ isLoading }) => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);


  const options = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  const handleAnimationComplete = () => {
    setIsAnimationCompleted(true);
  };


  const loaderSpeed = isLoading ? 1 : 0.5; 

  return (
    <>
      {isLoading && (
        <div className="flex items-center justify-center w-full h-screen bg-lemon_chiffon bg-opacity-80">
          <Lottie
            options={{ ...options, speed: loaderSpeed }}
            height={200}
            width={200}
            isStopped={!isLoading}
            isPaused={!isLoading}
            eventListeners={[{ eventName: 'complete', callback: handleAnimationComplete }]}
          />
        </div>
      )}
      {/* If you want to add any logic after loader finishes */}
      {isAnimationCompleted && !isLoading && (
        <div className="flex items-center justify-center w-full h-screen bg-champagne_pink">
          {/* Additional content after the animation finishes */}
          <p className="font-serif text-lg text-deep_indigo">Animation completed!</p>
        </div>
      )}
    </>
  );
};

export default Loader1;
