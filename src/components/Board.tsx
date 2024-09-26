import React, { useState } from "react";
import { useGame } from "../contexts/GameContext";
import SetUsers from "./SetUser";
import GameBoard from "./GameBoard";
import ModeSelect from "./ModeSelect";
import GameSelect from "./GameSelect";
import { createEmptyBoard } from "@/utils/gameLogic";
import LanguageSelect from "./LanguageSelect";

export default function Board() {
  const {
    setBoard,
    selectedLanguage,
    handleLanguageChange,
    mode,
    handleModeSelect,
    handleColorSelect,
    handlePlayersSubmit,
    setSelectedGame,
  } = useGame();

  // Adicionando o controle de step
  const [step, setStep] = useState<number>(2);

  // Avançar para o próximo step após os jogadores serem configurados
  const handleSubmitPlayers = (player1Name: string, player2Name: string) => {
    handlePlayersSubmit(player1Name, player2Name);
    setStep(5); // Avança para o próximo step após o submit
  };

  const handleGameSelect = (game: "Connect Four" | "Tic Tac Toe") => {
    setSelectedGame(game);
    setBoard(
      game === "Connect Four" ? createEmptyBoard(6, 7) : createEmptyBoard(3, 3)
    );
    setStep(3);
  };

  const _handleModeSelect = (mode: "multiplayer" | "vsComputer") => {
    setStep(4);
    handleModeSelect(mode);
  };

  return (
    <div>
      {!selectedLanguage && (
        <LanguageSelect handleLanguageChange={handleLanguageChange} />
      )}

      {selectedLanguage && step === 2 && (
        <GameSelect onGameSelect={handleGameSelect} />
      )}

      {selectedLanguage && step === 3 && (
        <ModeSelect handleModeSelect={_handleModeSelect} />
      )}

      {selectedLanguage && step === 4 && (
        <SetUsers
          handleColorSelect={handleColorSelect}
          mode={mode}
          handlePlayersSubmit={handleSubmitPlayers}
        />
      )}

      {selectedLanguage && mode && step === 5 && <GameBoard />}
    </div>
  );
}
