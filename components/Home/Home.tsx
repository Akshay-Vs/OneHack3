"use client";
import Button from "@/components/Home/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { faEarth } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [render, setRender] = useState(false);
  const [show, setShow] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    window.innerWidth > 720 ? setRender(true) : setRender(false);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  });

  return (
    <>
      {render ? (
        <div className="flex flex-col text-white md:flex-row h-screen">
          <div className="flex-1 m-5 mt-36  md:m-16">
            <h1 className="text-7xl font-light md:text-8xl tracking-tight">
              Master the <br />
              <span>Keyboard with Lightning</span> Speed
            </h1>
            <div className="pt-72 flex">
              <Link
                href="#"
                className="m-4 flex w-full text-4xl font-thin underline underline-offset-8 tracking-wider"
                onClick={() => setShowText(!showText)}
              >
                Welcome to Shiftype
              </Link>
              {showText && (
                <div className="px-5 m-4 flex text-xl opacity-25 -scale-x-[1] font-thin tracking-[7px] w-full justify-end align-bottom">
                  Made for OneHack 23 <br />
                  By Akshay Vs
                </div>
              )}
            </div>
          </div>
          <div className="flex-2 p-10 mr-12">
            <Button text="Start Typing" />
          </div>
          <div className="opacity-20">
            <div>E</div>
            <div>S</div>
            <div>C</div>
            <div>A</div>
            <div>P</div>
            <div>E</div>
            <div>F</div>
            <div>R</div>
            <div>O</div>
            <div>M</div>
            <div>T</div>
            <div>H</div>
            <div>E</div>
            <div>W</div>
            <div>O</div>
            <div>R</div>
            <div>L</div>
            <div>D</div>
            <div>O</div>
            <div>F</div>
            <div>D</div>
            <div>I</div>
            <div>S</div>
            <div>T</div>
            <div>R</div>
            <div>A</div>
            <div>C</div>
            <div>T</div>
            <div>I</div>
            <div>O</div>
            <div>N</div>
          </div>
        </div>
      ) : (
        show && (
          <div className="flex flex-col text-white md:flex-row h-screen justify-center font-bold">
            <div className="flex flex-col h-full justify-center ">
              <h1 className="text-center text-3xl px-3">
                Your screen size is insufficient for optimal viewing
              </h1>
              <h3
                className="text-center mt-10 underline cursor-pointer"
                onClick={() => setRender(true)}
              >
                Proceed anyway
              </h3>
            </div>
            <div className="flex flex-col h-full justify-end opacity-40">
              <h6 className="text-center p-3 -scale-x-[1]">
                Meanwhile, checkout my other profiles
              </h6>
              <div className="flex align-middle text-3xl pb-24 justify-center">
                <Link href="https://github.com/akshay-vs">
                  <FontAwesomeIcon icon={faGithub} className="px-3" />
                </Link>

                <Link href="https://akshayvs.me">
                  <FontAwesomeIcon icon={faEarth} className="px-3" />
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Home;
