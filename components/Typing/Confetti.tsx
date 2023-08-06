import React from "react";
import Confetti from "react-confetti";

const ShowConfetti = () => {
  return (
    <Confetti
      width={screen.availWidth - 150}
      height={screen.availHeight - 150}
      recycle={false}
      friction={0.99}
      wind={0.01}
      gravity={0.2}
      numberOfPieces={200}
      initialVelocityX={30}
      initialVelocityY={30}
      tweenDuration={1000}
      confettiSource={{
        x: screen.availWidth / 2,
        y: screen.availHeight / 2,
        w: 50,
        h: 50,
      }}
      colors={["#3ddada", "#aaa0aa", "#66d116", "#43ae43"]}
    />
  );
};

export default ShowConfetti;
