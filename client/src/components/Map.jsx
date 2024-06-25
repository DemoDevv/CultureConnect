import React, { useEffect, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { MapContainer, Marker } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import { divIcon } from "leaflet";

import constants from "../constants/api";

export default function Map({ setMuseumSelected }) {
  let [search, setSearch] = useState("");
  let [museums, setMuseums] = useState([]);
  let [stops, setStops] = useState([]);

  const getStops = async (museum) => {
    const data = await fetch(constants.RATP_API_PATH + "/stops/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(museum),
    });
    const json = await data.json();
    setStops(json);
    return;
  };

  useEffect(() => {
    if (search == "") {
      setMuseums([]);
      return;
    }
    const fetchDataWithQuery = async () => {
      const data = await fetch(
        constants.CULTURE_API_PATH + `/search/${search}`,
      );
      const json = await data.json();
      setMuseums(json.museums);
    };
    fetchDataWithQuery();
  }, [search]);

  const iconStop = renderToStaticMarkup(
    <img src="../../assets/bus-stop.png" alt="bus stop" className="w-8 h-8" />,
  );

  const iconMuseum = renderToStaticMarkup(
    <img src="../../assets/museum.png" alt="museum" className="w-8 h-8" />,
  );

  const customMarkerStop = divIcon({
    html: iconStop,
  });

  const customMarkerMuseum = divIcon({
    html: iconMuseum,
  });

  return (
    <div className="flex flex-col w-[70vw] bg-white rounded-[18px] p-5 gap-5">
      <MapContainer
        style={{ height: "70vh", width: "100%", borderRadius: "18px" }}
        center={[48.8566, 2.3488]}
        zoom={11.5}
        scrollWheelZoom={true}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* afficher les musées */}
        {museums.map((museum) => (
          <Marker
            key={museum.id}
            data={museum}
            position={[
              museum.coordinates.latitude,
              museum.coordinates.longitude,
            ]}
            eventHandlers={{
              click: (e) => {
                setMuseumSelected(e.target.options.data);
                getStops(e.target.options.data);
              },
            }}
            icon={customMarkerMuseum}
          />
        ))}
        {/* afficher les stops */}
        {stops.map((stop, index) => (
          <Marker
            key={index}
            position={[stop.coordinates.latitude, stop.coordinates.longitude]}
            icon={customMarkerStop}
          />
        ))}
      </MapContainer>
      <input
        type="text"
        placeholder="Rechercher des oeuvres"
        className="w-full h-[50px] border-b-[1px] border-black text-black placeholder-black font-catamaran font-thin text-[28px] outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
