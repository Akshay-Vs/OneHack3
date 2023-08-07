/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { calculateWPM } from "@/lib/calculateWpm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ShowConfetti from "./Confetti";

const texts = [
  "The quick brown fox jumps over the lazy dog. This sentence is a classic example used for testing typing speed and accuracy. It contains all the letters of the alphabet, allowing typists to practice their skills across the entire keyboard. As you embark on this typing test",
  "Remember to strike a balance between speed and precision. Focus on hitting the keys with accuracy and maintaining a steady rhythm. With practice, your typing skills will improve, and you'll be able to effortlessly express your thoughts through the swift strokes of your fingertips.",
  "The night is dark and full of terrors. The winds of Winter. What is dead may never die. And now his watch is ended. The battle of the redgrass field. Unbowed, Unbent, Unbroken. All men must die. Great plan! Let me diarize this, and we can synchronize ourselves at a later timeframe, for strategic staircase wiggle room. Idea shower: what's our go to market strategy",
  "Chuck Norris doesn't churn butter. He roundhouse kicks the cows and the butter comes straight out. When the Boogeyman goes to sleep every night, he checks his closet for Chuck Norris CNN was originally created as the Chuck Norris Network to update Americans with on-the-spot ass kicking in real-time",
];

const Window = () => {
  const [inputVaule, setInputValue] = useState("");
  const [textFinished, setTextFinished] = useState("");
  const [textUpcoming, setTextUpcoming] = useState("");
  const [textLimit, setTextLimit] = useState(1);
  const [mistakes, setMistakes] = useState(0);
  const [iswrong, setIsWrong] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [time, setTime] = useState("0:00");
  const [isComplete, setIsComplete] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [text, setText] = useState("");

  const textLength = 20;

  const handleTextFinished = (len: number) => {
    !isInit ? setIsInit(true) : null;
    setTextLimit(textLimit + 1);
    if (textLimit < 10) return setTextFinished(text.slice(len, textLimit));
    setTextFinished(text.slice(textLimit - 10, textLimit));
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    const len = value.lenght;
    if (text.slice(0, textLimit) === value) {
      setInputValue(value);
      setTextUpcoming(text.slice(textLimit, textLimit + textLength));
      handleTextFinished(len);
      if (value == text) {
        setWpm(calculateWPM(text.length, time));
        setIsComplete(true);
        return setIsInit(false);
      }
    } else {
      setIsWrong(true);
      setMistakes(mistakes + 1);
    }
    setTimeout(() => {
      setIsWrong(false);
    }, 1000);
  };

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 8) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    const text = texts[Math.floor(Math.random() * texts.length)];
    setText(text);
    setTextUpcoming(text.slice(0, textLength));
  }, []);
  return (
    <div className="h-screen max-w-screen bg-zinc-900">
      <div className="flex text-white text-center flex-col h-full">
        <div className="m-10 text-xl flex flex-start font-semibold">
          <Link href="/" className="text-slate-400">
            <FontAwesomeIcon icon={faArrowLeft} size="xs" /> Home
          </Link>
        </div>
        <div className="mt-10 text-5xl flex felx-col justify-center align-middle font-semibold max-w-full h-20 text-center overflow-hidden">
          <span className="text-slate-50 px-2">{textFinished}</span>
          <span className="text-slate-400">{textUpcoming}</span>
        </div>
        <div className="mt-16 text-xl font-semibold flex justify-evenly px-36">
          <div className="mt-6 text-xl font-semibold felx justify-center align-middle flex-col text-slate-300">
            <Timer isInit={isInit} setTime={(time: string) => setTime(time)} />
          </div>
          <div className="mt-6 text-xl font-semibold text-slate-300">
            {wpm} WPM
          </div>
          <div className="mt-6 text-xl font-semibold text-slate-300">
            {mistakes} Mistakes
          </div>
        </div>

        <div className="mt-16 text-5xl font-semibold">
          <input
            className={` text-3xl font-semibold border-b-4 text-center caret-slate-500 bg-zinc-900 h-24 w-5/12 focus:outline-none
            ${
              iswrong
                ? "text-red-600 focus:ring-red-700 border-b-red-600 "
                : "text-white focus:ring-0"
            }`}
            type="text"
            value={inputVaule}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Start typing to begin"
            autoFocus
          />
          {isComplete && (
            <>
              <ShowConfetti />
              <div
                className="text-2xl font-semibold mt-16 text-slate-400 cursor-pointer"
                onClick={() => location.reload()}
              >
                Click to restart
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Window;
