import React, { useState } from "react";
import { useGame } from "../contexts/GameContext";
import SetUsers from "./SetUser";
import GameBoard from "./GameBoard";
import ModeSelect from "./ModeSelect";
import LanguageSelect from "./LanguageSelect";

const Board: React.FC = () => {
  const {
    selectedLanguage,
    handleLanguageChange,
    mode,
    handleModeSelect,
    player1Color,
    player2Color,
    handleColorSelect,
    handlePlayersSubmit,
  } = useGame();

  // Adicionando o controle de step
  const [step, setStep] = useState<number>(1);

  // Avançar para o próximo step após os jogadores serem configurados
  const handleSubmitPlayers = (player1Name: string, player2Name: string) => {
    handlePlayersSubmit(player1Name, player2Name);
    setStep(2); // Avança para o próximo step após o submit
  };

  return (
    <div>
      {!selectedLanguage && (
        <LanguageSelect handleLanguageChange={handleLanguageChange} />
      )}

      {selectedLanguage && !mode && (
        <ModeSelect handleModeSelect={handleModeSelect} />
      )}

      {selectedLanguage && mode && step === 1 && (
        <SetUsers
          player1Color={player1Color}
          player2Color={player2Color}
          handleColorSelect={handleColorSelect}
          mode={mode}
          handlePlayersSubmit={handleSubmitPlayers} // Usa a função local para avançar o step
        />
      )}

      {selectedLanguage && mode && step === 2 && <GameBoard />}
    </div>
  );
};

export default Board;
