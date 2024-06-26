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
        "Content-Type": "application/json"
      },
      body: JSON.stringify(artwork)
    }).then(r => {
      if (!r.ok) return setFavoriteState("Déjà en favoris");

      setFavoriteState("Ajouté au favoris");
    });
  }

  return (
    <div className="w-[70vw] bg-white rounded-[18px]">
      <h1>{artwork.name}</h1>
      <p>{artwork.author}</p>
      <p>{artwork.size}</p>
      <p>{artwork.type}</p>

      <button className="mx-left w-full" onClick={() => addToFavorite(artwork)}>{favoriteState}</button>
    </div>
  );
}
