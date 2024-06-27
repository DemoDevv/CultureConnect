import { useState } from "react";
import constants from "../constants/api";
import { useAuth } from "./AuthProvider";

export default function Item(artwork) {
  const [favoriteState, setFavoriteState] = useState("Add to favorite");
  const { getToken } = useAuth();

  function addToFavorite(artwork) {
    fetch(`${constants.USERS_API_PATH}/favorites`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer: ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artwork),
    }).then((r) => {
      if (!r.ok) return setFavoriteState("Déjà en favoris");

      setFavoriteState("Ajouté au favoris");
    });
  }

  return (
    <div className="w-[70vw] bg-white rounded-[16px] p-5">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="flex gap-3">
            <h1 className="text-xl font-bold">{artwork.name}</h1>
            <p className="text-gray-400">({artwork.author})</p>
          </div>
          <div className="flex gap-3">
            <p>{artwork.size}</p>
            <p>{artwork.type}</p>
          </div>
        </div>

        {/* placeholder d'une image qui n'est pas présente */}
        <div className="w-16 h-16 bg-gray-50"></div>
      </div>

      <div className="flex w-full items-center justify-center">
        <button
          onClick={() => addToFavorite(artwork)}
          className="flex gap-3 justify-center items-center"
        >
          {favoriteState}
          {favoriteState ? (
            <img src="../../assets/Heart.svg" className="w-5 h-5" />
          ) : (
            <img src="../../assets/Heart-vide.svg" className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
