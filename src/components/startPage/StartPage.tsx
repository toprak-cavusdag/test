import React, { useEffect, useRef } from "react";
import Button from "../Button";
import { gsap } from "gsap";

interface StartPageProps {
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
}

const StartPage: React.FC<StartPageProps> = ({ setHasStarted, setFinished }) => {
  const logoRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // GSAP animasyonları
    gsap.fromTo(
      logoRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      titleRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );

    gsap.fromTo(
      textRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );

    gsap.fromTo(
      buttonRef.current,
      { y: 50, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: "elastic.out(1, 0.5)" }
    );
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <img ref={logoRef} src="/logo.png" className="object-cover max-w-lg mb-6" />
      <h1 ref={titleRef} className="text-4xl font-bold text-green-700 mb-4">
        Karbon Ayak İzi Testine Hoş Geldiniz
      </h1>
      <p ref={textRef} className="text-lg text-center text-slate-700 max-w-md mb-8">
        Pardon, yaşam tarzınıza dair birkaç soruya yanıt vererek doğaya ne kadar dost olduğunuzu öğrenin.
      </p>
      <Button
        ref={buttonRef}
        onClick={() => {
          setHasStarted(true);
          setFinished(false);
        }}
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl"
      >
        Teste Başla
      </Button>
    </div>
  );
};

export default StartPage;