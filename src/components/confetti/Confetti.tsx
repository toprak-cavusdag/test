
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const ConfettiCelebration = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (!containerRef.current) return;

    const createConfetti = () => {
      const particles = 50;
      const colors = ["#ff4757", "#1e90ff", "#2ed573", "#ffa502", "#ff6b81"];
      const duration = 4; 

      const confettiElements: HTMLDivElement[] = [];

      for (let i = 0; i < particles; i++) {
        const confetti = document.createElement("div");
        const size = Math.random() * 6 + 4; // Rastgele boyutlar
        confetti.className = "absolute rounded-md";
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size * (Math.random() > 0.5 ? 0.4 : 1)}px`; // Dikdörtgen ve kare konfetiler
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = "-2%";
        containerRef.current?.appendChild(confetti);
        confettiElements.push(confetti);

        gsap.to(confetti, {
          y: "100vh", 
          x: (Math.random() - 0.5) * 200,
          rotation: Math.random() * 360, // Döndürme efekti
          duration: duration + Math.random(),
          ease: "power1.in",
          onComplete: () => confetti.remove(),
        });
      }

      setTimeout(() => {
        confettiElements.forEach((confetti) => confetti.remove());
      }, duration * 1000 + 500);
    };

    interval = setInterval(createConfetti, 500);

    setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none" />;
};

export default ConfettiCelebration;