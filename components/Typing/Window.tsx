/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useState } from "react";
import Timer from "./Timer";
import { calculateWPM } from "@/lib/calculateWpm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ShowConfetti from "./Confetti";

//#region data
const data = "The quick brown fox jumps over the lazy dog."

//"This sentence is a classic example used for testing typing speed and accuracy. It contains all the letters of the alphabet, allowing typists to practice their skills across the entire keyboard. As you embark on this typing test, remember to strike a balance between speed and precision. Focus on hitting the keys with accuracy and maintaining a steady rhythm. With practice, your typing skills will improve, and you'll be able to effortlessly express your thoughts through the swift strokes of your fingertips."
// "The zoophilous rhizophilic xyloglyphy of the hemidemisemiquaver required an inordinate amount of dexterity and concentration on the QWERTY keyboard."
//"The unyielding dichlorodifluoromethane permeating the surroundings further exacerbated the challenge, as the mechanical actuation of each arduous key demanded meticulous precision. The pneumonoultramicroscopicsilicovolcanoconiosis-affected fingers trembled, yet the perseverant typist forged ahead, defying the perplexity of their endeavor. Through perseverance and tenacity, the formidable words were triumphantly transcribed, their elusive consonants and vowels elegantly woven into a coherent paragraph despite the labyrinthine constraints of the QWERTY layout.";
//#endregion

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

  const textLength = 20;

  const handleTextFinished = (len: number) => {
    !isInit ? setIsInit(true) : null;
    setTextLimit(textLimit + 1);
    if (textLimit < 10) return setTextFinished(data.slice(len, textLimit));
    setTextFinished(data.slice(textLimit - 10, textLimit));
  };

  const handleChange = (event: any) => {
    const value = event.target.value;
    const len = value.lenght;
    if (data.slice(0, textLimit) === value) {
      setInputValue(value);
      setTextUpcoming(data.slice(textLimit, textLimit + textLength));
      handleTextFinished(len);
      if (value == data) {
        setWpm(calculateWPM(data.length, time));
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
    setTextUpcoming(data.slice(0, textLength));
  }, []);
  return (
    <div className="h-screen w-screen bg-zinc-900">
      <div className="flex text-white text-center flex-col h-full">
        <div className="m-10 text-xl flex flex-start font-semibold">
          <Link href="/" className="text-slate-400">
            <FontAwesomeIcon icon={faArrowLeft} size='xs' /> Home
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
          <div className="mt-6 text-xl font-semibold text-slate-300">{wpm} WPM</div>
          <div className="mt-6 text-xl font-semibold text-slate-300">{mistakes} Mistakes</div>
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
