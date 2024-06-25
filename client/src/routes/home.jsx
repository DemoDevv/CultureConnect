import React, { useState } from "react";

import Map from "../components/Map";
import List from "../components/List";
import NavigationBar from "../components/NavigationBar";

export default function Home() {
  let [results, setResults] = useState([]);
  let [museumSelected, setMuseumSelected] = useState(null);

  return (
    <>
      <NavigationBar />
      <div className="flex flex-col items-center">
        <Map onChange={setResults} />
        {results.length == 0 ? (
          <></>
        ) : (
          <>
            <h2>Résultats</h2>
            <List items={results} />
          </>
        )}
      </div>
    </>
  );
}
