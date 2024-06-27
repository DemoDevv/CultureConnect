import React, { useEffect, useState } from "react";

import Map from "../components/Map";
import List from "../components/List";
import NavigationBar from "../components/NavigationBar";

import constants from "../constants/api";
import { useAuth } from "../components/AuthProvider";

export default function Home() {
  const [museumSelected, setMuseumSelected] = useState({});
  const [artworks, setArtworks] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    fetch(`${constants.USERS_API_PATH}/favorites`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(r => r.json())
      .then(r => {
        setFavoriteIds(r.map(a => a._id))
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        constants.CULTURE_API_PATH +
          `/museums/artworks/${museumSelected.museofile}`,
      );
      const json = await data.json();
      setArtworks(json);
    };
    fetchData();
  }, [museumSelected]);

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center gap-20">
        <Map setMuseumSelected={setMuseumSelected} />
        {/* ajouter les oeuvres d'art du musée selectionné */}
        <List items={artworks} favoriteIds={favoriteIds} />
      </div>
    </>
  );
}
