// src/components/SetUsers.tsx
import { Player } from "@/utils/gameLogic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface SetUsersProps {
  player1Color: Player | null;
  player2Color: Player | null;
  handleColorSelect: (color: Player, isPlayer1: boolean) => void;
  mode: "multiplayer" | "vsComputer" | null;
  handlePlayersSubmit: (player1Name: string, player2Name: string) => void;
}

const SetUsers: React.FC<SetUsersProps> = ({
  player1Color,
  player2Color,
  handleColorSelect,
  mode,
  handlePlayersSubmit,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { register, handleSubmit } = useForm();
  const { t } = useTranslation();

  return (
    <form
      onSubmit={handleSubmit((data) =>
        handlePlayersSubmit(data.player1Name, data.player2Name)
      )}
      className="flex flex-col space-y-4 bg-slate-300 p-4"
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
          {["red", "yellow", "blue", "green", "purple"].map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full border cursor-pointer ${
                color === player1Color ? "border-black" : ""
              } ${
                color === player2Color ? "bg-gray-400 cursor-not-allowed" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorSelect(color as Player, true)}
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
                  onClick={() => handleColorSelect(color as Player, false)}
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
};

export default SetUsers;
