import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Card from "../Card";
import Button from "../Button";
import ConfettiCelebration from "../confetti/Confetti";

type Result = {
  range: string;
  badge: string;
  emoji: string;
  title: string;
  description: string;
  advice: string;
  award: string;
};

interface FinalPageProps {
  result: Result;
  totalScore: number;
  onRestart: () => void;
}

const FinalPage: React.FC<FinalPageProps> = ({
  result,
  onRestart,
  totalScore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Kartın giriş animasyonu
    if (containerRef.current) {
      tl.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.8, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.8 }
      );
    }

    // Elemanların sıralı animasyonları
    elementsRef.current.forEach((el, i) => {
      if (el) {
        tl.fromTo(
          el,
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5 },
          `-=${i === 0 ? 0.3 : 0.2}` // Daha akıcı bir sıralama
        );
      }
    });

    // Rozet için özel bir vurgu animasyonu
    const badgeEl = elementsRef.current[2]; // Rozet resmi
    if (badgeEl) {
      tl.to(
        badgeEl,
        {
          scale: 1.1,
          rotation: 360,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.3"
      ).to(badgeEl, { scale: 1, duration: 0.3 });
    }

    const buttonEl = elementsRef.current[7];
    if (buttonEl) {
      tl.to(
        buttonEl,
        {
          scale: 1.05,
          repeat: 3,
          yoyo: true,
          duration: 0.3,
          ease: "power1.inOut",
        },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <Card
        ref={containerRef}
        className="p-6 shadow-xl text-center max-w-2xl mx-auto space-y-4"
      >
        <div
          ref={(el) => {
            elementsRef.current[0] = el;
          }}
        >
          <h2 className="text-3xl font-bold">Sonuç</h2>
        </div>

        <div
          ref={(el) => {
            elementsRef.current[1] = el;
          }}
        >
          <p className="text-xl">
            Toplam Puanınız: <strong>{totalScore}</strong>
          </p>
        </div>

        <div
          ref={(el) => {
            elementsRef.current[2] = el;
          }}
        >
          <img src={result.award} className="w-72 h-auto mx-auto" alt="badge" />
        </div>

        <div
          ref={(el) => {
            elementsRef.current[3] = el;
          }}
        >
          <p className="text-3xl">
            {result.emoji} {result.badge}
          </p>
        </div>

        <div
          ref={(el) => {
            elementsRef.current[4] = el;
          }}
        >
          <p className="text-xl text-gray-700">{result.title}</p>
        </div>

        <div
          ref={(el) => {
            elementsRef.current[5] = el;
          }}
        >
          <p className="text-lg text-gray-500 italic">{result.description}</p>
        </div>

        <div
          ref={(el) => {
            elementsRef.current[6] = el;
          }}
        >
          <p className="text-gray-400">{result.advice}</p>
        </div>

        <div
          ref={(el) => {
            elementsRef.current[7] = el;
          }}
        >
          <Button className="mt-6 bg-black text-white" onClick={onRestart}>
            Tekrar Başla
          </Button>
        </div>
      </Card>

      <ConfettiCelebration />
    </>
  );
};

export default FinalPage;