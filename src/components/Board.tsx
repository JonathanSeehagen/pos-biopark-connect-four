// src/components/Board.tsx
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useGame } from "../contexts/GameContext";
import { useTranslation } from "react-i18next";

const Board: React.FC = () => {
  const {
    board,
    player1,
    player2,
    currentPlayer,
    winner,
    handleClick,
    resetGame,
    setPlayer1Color,
    setPlayer2Color,
    startGame,
    mode,
    setMode,
  } = useGame();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, setValue } = useForm();

  const [player1Color, setPlayer1ColorState] = useState("red");
  const [player2Color, setPlayer2ColorState] = useState("yellow");
  const [showPlayerSetup, setShowPlayerSetup] = useState(true);
  const [showLanguageSetup, setShowLanguageSetup] = useState(true);
  const [showModeSetup, setShowModeSetup] = useState(true);

  const handleColorSelect = (color: string, isPlayer1: boolean) => {
    if (isPlayer1) {
      if (player2Color !== color) {
        setPlayer1ColorState(color);
        setPlayer1Color(color as any);
      }
    } else {
      if (player1Color !== color) {
        setPlayer2ColorState(color);
        setPlayer2Color(color as any);
      }
    }
  };

  const handlePlayersSubmit = (data: any) => {
    startGame(data.player1Name, data.player2Name);
    setShowPlayerSetup(false);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageSetup(false);
  };

  const handleModeSelect = (mode: "multiplayer" | "vsComputer") => {
    setMode(mode);
    if (mode === "vsComputer") {
      setValue(
        "player2Name",
        mode === "vsComputer" ? t("computer_player_name") : ""
      );
      setPlayer2Color("black"); // Define a cor preta para o jogador computador
      setPlayer2ColorState("black");
    }
    setShowModeSetup(false);
  };

  function Render_LanguageSelect() {
    return (
      <div className="flex flex-col space-y-4 bg-slate-300 p-4">
        <h2 className="text-2xl font-bold text-black">{`${t(
          "select_language"
        )}:`}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleLanguageChange("en")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("english")}
          </button>
          <button
            onClick={() => handleLanguageChange("pt")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("portuguese")}
          </button>
          <button
            onClick={() => handleLanguageChange("es")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("spanish")}
          </button>
        </div>
      </div>
    );
  }

  function Render_SetUsers() {
    return (
      <form
        onSubmit={handleSubmit(handlePlayersSubmit)}
        className="flex flex-col space-y-4 bg-slate-300 p-4"
      >
        <div className="flex flex-col">
          <label htmlFor="player1Name" className="mb-2 text-black">
            {t("player1_name")}
          </label>
          <input
            type="text"
            ref={inputRef}
            {...register("player1Name", { required: true })}
            className="border p-2 text-black bg-white"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="player1Color" className="mb-2 text-black">
            {t("player1_color")}
          </label>
          <div className="flex space-x-2">
            {["red", "yellow", "blue", "green", "purple"].map((color) => (
              <div
                key={color}
                className={`w-8 h-8 rounded-full border cursor-pointer ${
                  color === player1Color ? "border-black" : ""
                } ${
                  color === player2Color ? "bg-gray-400 cursor-not-allowed" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color, true)}
              />
            ))}
          </div>
        </div>

        {mode === "multiplayer" && (
          <>
            <div className="flex flex-col">
              <label htmlFor="player2Name" className="mb-2 text-black">
                {t("player2_name")}
              </label>
              <input
                type="text"
                {...register("player2Name", { required: true })}
                className="border p-2 text-black bg-white"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="player2Color" className="mb-2 text-black">
                {t("player2_color")}
              </label>
              <div className="flex space-x-2">
                {["red", "yellow", "blue", "green", "purple"].map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full border cursor-pointer ${
                      color === player2Color ? "border-black" : ""
                    } ${
                      color === player1Color
                        ? "bg-gray-400 cursor-not-allowed"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color, false)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {t("start_game")}
        </button>
      </form>
    );
  }

  function Render_ModeSelect() {
    return (
      <div className="flex flex-col space-y-4 bg-slate-300 p-4">
        <h2 className="text-2xl font-bold text-black">{t("select_mode")}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => handleModeSelect("multiplayer")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("multiplayer")}
          </button>
          <button
            onClick={() => handleModeSelect("vsComputer")}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("vs_computer")}
          </button>
        </div>
      </div>
    );
  }

  function Render_Board() {
    return (
      <div className="flex space-x-8">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="w-12 h-12 bg-gray-100 border border-black flex items-center justify-center cursor-pointer"
                onClick={() => {
                  handleClick(colIndex);
                }}
              >
                {cell && (
                  <div
                    className={`w-8 h-8 rounded-full ${
                      cell === "red"
                        ? "bg-red-500"
                        : cell === "yellow"
                        ? "bg-yellow-500"
                        : cell === "blue"
                        ? "bg-blue-500"
                        : cell === "green"
                        ? "bg-green-500"
                        : cell === "black"
                        ? "bg-black"
                        : "bg-purple-500"
                    }`}
                  />
                )}
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <div className="text-xl font-bold text-black">{t("player_info")}</div>
          <div className="text-lg text-black">
            <span className="font-bold">{player1?.name}</span>:{" "}
            <span style={{ color: player1?.color }}>
              {t(`colors.${player1?.color}`)}
            </span>
          </div>
          <div className="text-lg text-black">
            <span className="font-bold">{player2?.name}</span>:{" "}
            <span style={{ color: player2?.color }}>
              {t(`colors.${player2?.color}`)}
            </span>
          </div>
          <div className="text-xl font-bold text-black mt-4">
            {t("current_player")}:
            <div
              className="text-lg font-bold"
              style={{ color: currentPlayer?.color }}
            >
              {currentPlayer?.name}
            </div>
          </div>
          {winner && (
            <div className="text-2xl font-bold text-black mb-4">
              {winner === "draw"
                ? t("it's_a_draw")
                : `${winner.name} ${t("wins")}!`}
            </div>
          )}
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {t("reset_game")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {showLanguageSetup && <Render_LanguageSelect />}
      {!showLanguageSetup && showModeSetup && <Render_ModeSelect />}
      {!showLanguageSetup && !showModeSetup && showPlayerSetup && (
        <Render_SetUsers />
      )}
      {!showLanguageSetup && !showModeSetup && !showPlayerSetup && (
        <Render_Board />
      )}
    </div>
  );
};

export default Board;
