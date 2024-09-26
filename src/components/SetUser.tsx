// src/components/SetUsers.tsx
import { Player } from "@/utils/gameLogic";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SetUsersProps {
  handleColorSelect: (color: Player, isPlayer1: boolean) => void;
  mode: "multiplayer" | "vsComputer" | null;
  handlePlayersSubmit: (player1Name: string, player2Name: string) => void;
}

export default function SetUsers({
  handleColorSelect,
  mode,
  handlePlayersSubmit,
}: SetUsersProps) {
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();

  // Estados para as cores dos jogadores
  const [player1Color, setPlayer1Color] = useState<Player>("red"); // Cor padrão do jogador 1
  const [player2Color, setPlayer2Color] = useState<Player>(
    mode === "multiplayer" ? "orange" : "black"
  ); // Cor padrão do jogador 2

  useEffect(() => {
    handleColorSelect(player1Color, true); // Define a cor do jogador 1
    handleColorSelect(player2Color, false); // Define a cor do jogador 2
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data) =>
        handlePlayersSubmit(data.player1Name, data.player2Name)
      )}
      className="flex flex-col space-y-4 bg-gray-100 p-5 rounded-xl shadow-lg border-gray-300 border-1"
    >
      <div className="flex flex-col">
        <label htmlFor="player1Name" className="mb-2 text-black">
          {t("player1_name")}
        </label>
        <input
          type="text"
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
          {["red", "orange", "blue", "green", "purple"].map((color) => (
            <div key={color} className="relative">
              <div
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  color === player1Color
                    ? "border-2 border-black" // Borda preta quando selecionada
                    : color === player2Color
                    ? "bg-transparent" // Cor transparente quando bloqueada
                    : ""
                }`}
                style={{
                  backgroundColor:
                    color === player2Color ? "transparent" : color,
                }} // Ajusta a cor para transparente se bloqueada
                onClick={() => {
                  if (color !== player2Color) {
                    setPlayer1Color(color as Player); // Atualiza a cor do jogador 1
                    handleColorSelect(color as Player, true);
                  }
                }}
              />
              {color === player2Color && (
                <div className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center text-red-500">
                  &#x1F512; {/* Código do emoji de bloqueio */}
                </div>
              )}
            </div>
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
              {["red", "orange", "blue", "green", "purple"].map((color) => (
                <div key={color} className="relative">
                  <div
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      color === player2Color
                        ? "border-2 border-black" // Borda preta quando selecionada
                        : color === player1Color
                        ? "bg-transparent" // Cor transparente quando bloqueada
                        : ""
                    }`}
                    style={{
                      backgroundColor:
                        color === player1Color ? "transparent" : color,
                    }} // Ajusta a cor para transparente se bloqueada
                    onClick={() => {
                      if (color !== player1Color) {
                        setPlayer2Color(color as Player); // Atualiza a cor do jogador 2
                        handleColorSelect(color as Player, false);
                      }
                    }}
                  />
                  {color === player1Color && (
                    <div className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center text-red-500">
                      &#x1F512; {/* Código do emoji de bloqueio */}
                    </div>
                  )}
                </div>
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
