import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import questionsData from "../../data/data.json";
import Card from "../Card";
import Button from "../Button";
import FinalPage from "../finalPage/FinalPage";
import StartPage from "../startPage/StartPage";

type Option = {
  text: string;
  value: number;
};

type Question = {
  id: number;
  category: string;
  question: string;
  icon: string;
  options: Option[];
};

type Result = {
  range: string;
  badge: string;
  emoji: string;
  title: string;
  description: string;
  advice: string;
  award: string;
};

const questions: Question[] = questionsData.questions;
const results: Result[] = questionsData.results;

export default function CarbonCalculator() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLHeadingElement>(null);
  const questionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<React.RefObject<HTMLButtonElement | null>[]>([]);
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<GSAPTimeline | null>(null); // Timeline'ı saklamak için

  useEffect(() => {
    buttonsRef.current =
      questions[step]?.options.map(() => React.createRef<HTMLButtonElement>()) || [];
  }, [step]);

  // Soru ekranı animasyonu
  useEffect(() => {
    if (!hasStarted || finished) return;

    // Eski animasyonları temizle
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    setIsAnimating(true);
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });
    timelineRef.current = tl;

    if (cardRef.current) {
      tl.fromTo(
        cardRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        0
      );
    }

    if (progressRef.current) {
      tl.fromTo(
        progressRef.current,
        { width: `${(step / questions.length) * 100}%`, opacity: 0 },
        {
          width: `${((step + 1) / questions.length) * 100}%`,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        0
      );
    }

    const steps = document.querySelectorAll(".step-number");
    steps.forEach((stepEl, index) => {
      tl.to(
        stepEl,
        {
          opacity: index <= step ? 1 : 0.3,
          duration: 0.5,
          ease: "power2.out",
        },
        0
      );
    });

    if (categoryRef.current) {
      tl.fromTo(
        categoryRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        0
      );
    }

    if (questionRef.current) {
      tl.fromTo(
        questionRef.current,
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" },
        0
      );
    }

    if (iconRef.current) {
      tl.fromTo(
        iconRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "bounce.out" },
        0
      );
    }

    const buttons = gsap.utils.toArray(".button");
    tl.fromTo(
      buttons,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.out",
        stagger: 0,
      },
      0
    );

    if (backButtonRef.current) {
      tl.fromTo(
        backButtonRef.current,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "elastic.out" },
        0
      );
    }
    if (nextButtonRef.current) {
      tl.fromTo(
        nextButtonRef.current,
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: "elastic.out" },
        0
      );
    }

    // Cleanup on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [step, hasStarted, finished]);

  const handleAnswer = (value: number) => {
    if (isAnimating) return;
    const updatedAnswers = [...answers];
    updatedAnswers[step] = value;
    setAnswers(updatedAnswers);
    if (step + 1 < questions.length) setStep(step + 1);
    else setFinished(true);
  };


  const goToStep = (stepIndex: number) => {
    if (isAnimating || stepIndex >= questions.length || stepIndex < 0 || stepIndex > step) return;
    setStep(stepIndex);
  };

  const getTotalScore = (): number =>
    answers.reduce((acc, val) => acc + val, 0);

  const getResult = (): Result => {
    const total = getTotalScore();
    if (total <= 150) return results[0];
    if (total <= 300) return results[1];
    if (total <= 450) return results[2];
    return results[3];
  };

  if (!hasStarted) {
    return (
      <StartPage setHasStarted={setHasStarted} setFinished={setFinished} />
    );
  }

  return (
    <div className="h-screen w-full bg-gradient-to-br from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      {!finished ? (
        <Card
          ref={cardRef}
          className="p-6 shadow-xl overflow-hidden w-full h-[90vh]"
        >
          <div className="relative mb-4">
            <div className="flex justify-between mb-2">
              {Array.from({ length: questions.length }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToStep(i)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold step-number transition-all duration-200
                    ${
                      answers[i] === undefined || i > step
                        ? "bg-white text-green-600 border border-green-600"
                        : "bg-green-600 text-white"
                    }
                  `}
                  style={{ opacity: i <= step ? 1 : 0.3 }}
                  disabled={i > step || answers[i] === undefined || isAnimating}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="h-1 bg-green-100 rounded-full">
              <div
                ref={progressRef}
                className="h-1 bg-green-600 rounded-full"
                style={{ width: "0%" }}
              ></div>
            </div>
          </div>

          <div
            ref={iconRef}
            className="w-24 h-24 rounded-full mx-auto mt-16 flex items-center justify-center text-white mb-4"
          >
            <img
              src={questions[step].icon}
              alt={`${questions[step].category} icon`}
              className="w-24 h-24 object-contain"
            />
          </div>

          <h2
            ref={categoryRef}
            className="text-xl font-semibold mb-2 mx-auto text-center"
          >
            {questions[step].category}
          </h2>
          <p
            ref={questionRef}
            className="text-4xl text-slate-900 font-bold mb-6 mx-auto text-center"
          >
            {questions[step]?.question}
          </p>

          <div className="grid grid-cols-2 gap-8 mt-20">
            {Array(4)
              .fill(0)
              .map((_, i) => {
                const opt = questions[step].options[i];
                return opt ? (
                  <Button
                    key={i}
                    variant="solid"
                    onClick={() => handleAnswer(opt.value)}
                    ref={buttonsRef.current[i]}
                    className="w-full text-white bg-black rounded-lg py-2"
                    disabled={isAnimating}
                  >
                    {opt.text || `cevap ${i + 1}`}
                  </Button>
                ) : null;
              })}
          </div>

        </Card>
      ) : (
        <FinalPage
          result={getResult()}
          totalScore={getTotalScore()}
          onRestart={() => {
            setStep(0);
            setAnswers([]);
            setFinished(false);
            setHasStarted(false);
          }}
        />
      )}
    </div>
  );
}