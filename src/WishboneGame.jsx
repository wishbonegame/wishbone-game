import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "/components/ui/button";

export default function WishboneGame() {
  const [isBroken, setIsBroken] = useState(false);
  const [winner, setWinner] = useState("");
  const [pulling, setPulling] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const handlePlayerClick = () => {
    if (isBroken || pulling) return;
    setPulling(true);
    setShowHint(false);
    setTimeout(() => {
      const result = Math.random() < 0.5 ? "You" : "AI";
      setWinner(result);
      setIsBroken(true);
      setPulling(false);
    }, 1000);
  };

  const resetGame = () => {
    setIsBroken(false);
    setWinner("");
    setPulling(false);
    setShowHint(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-4">Wishbone Breaker 🦴</h1>
      <p className="text-center text-gray-700 mb-4 max-w-md">
        Haz clic en el hueso para tirar hacia tu lado. La IA tirará del otro. ¡El lado más largo gana!
      </p>
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Realistic wishbone shape using SVG with break animation */}
        <svg
          viewBox="0 0 200 200"
          className="w-80 h-80 cursor-pointer"
          onClick={handlePlayerClick}
        >
          {!isBroken ? (
            <>
              <path
                d="M100 100 C60 80, 50 20, 40 0"
                stroke="#fff"
                strokeWidth="6"
                fill="none"
              />
              <path
                d="M100 100 C140 80, 150 20, 160 0"
                stroke="#fff"
                strokeWidth="6"
                fill="none"
              />
              {showHint && (
                <motion.text
                  x="60"
                  y="110"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  fill="black"
                  fontSize="16"
                >
                  👉 Haz clic para tirar
                </motion.text>
              )}
            </>
          ) : (
            <>
              {winner === "You" && (
                <>
                  <path
                    d="M100 100 C60 80, 50 20, 40 0"
                    stroke="#fff"
                    strokeWidth="6"
                    fill="none"
                    style={{ transform: "rotate(-20deg) translate(-15px, -10px)", transformOrigin: "100px 100px" }}
                  />
                  <path
                    d="M100 100 C140 80, 150 20, 160 0"
                    stroke="#fff"
                    strokeWidth="6"
                    fill="none"
                    style={{ opacity: 0.3 }}
                  />
                </>
              )}
              {winner === "AI" && (
                <>
                  <path
                    d="M100 100 C60 80, 50 20, 40 0"
                    stroke="#fff"
                    strokeWidth="6"
                    fill="none"
                    style={{ opacity: 0.3 }}
                  />
                  <path
                    d="M100 100 C140 80, 150 20, 160 0"
                    stroke="#fff"
                    strokeWidth="6"
                    fill="none"
                    style={{ transform: "rotate(20deg) translate(15px, -10px)", transformOrigin: "100px 100px" }}
                  />
                </>
              )}
            </>
          )}
        </svg>
      </div>
      {isBroken && (
        <div className="mt-6 text-xl font-bold text-green-800">
          🎉 {winner} gana. ¡Pide un deseo!
        </div>
      )}
      <Button onClick={resetGame} className="mt-6">Jugar otra vez</Button>
    </div>
  );
}