import React, { useEffect, useState } from "react";

import Map from "../components/Map";
import List from "../components/List";
import NavigationBar from "../components/NavigationBar";

import constants from "../constants/api";

export default function Home() {
  let [museumSelected, setMuseumSelected] = useState({});
  let [artworks, setArtworks] = useState([]);

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
        <List items={artworks} />
      </div>
    </>
  );
}
