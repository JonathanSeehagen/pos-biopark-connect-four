"use client";

import { GameProvider } from "@/contexts/GameContext";
import "../../i18n";
import Board from "@/components/Board";

const Home: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8 text-black">Connect Four</h1>
        <GameProvider>
          <Board />
        </GameProvider>
      </div>
    </>
  );
};

export default Home;
