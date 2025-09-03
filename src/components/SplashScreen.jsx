import React, { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState("fadeIn");

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationPhase("pulse");
    }, 500);

    const timer2 = setTimeout(() => {
      setAnimationPhase("fadeOut");
    }, 2500);

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-600">
      {/* Full screen splash image */}
      <div
        className={`w-full h-full flex items-center justify-center transition-all duration-1000 ${
          animationPhase === "fadeIn"
            ? "opacity-0 transform scale-95"
            : animationPhase === "pulse"
            ? "opacity-100 transform scale-100"
            : "opacity-0 transform scale-105"
        }`}
      >
        <img
          src="/Igma Kadima Official splash screen subject.png"
          alt="Igma Kadima Official Splash Screen"
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Loading animation overlay */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
        <div
          className={`transition-all duration-1000 delay-500 ${
            animationPhase === "fadeIn"
              ? "opacity-0 transform translate-y-8"
              : animationPhase === "pulse"
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
        >
          <div className="flex justify-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-5 border-white"></div>
          </div>
         
        </div>
      </div>

      {/* Custom CSS animations */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;