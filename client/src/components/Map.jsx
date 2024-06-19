import React, { useState } from "react";

import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";

export default function Map({ onChange }) {
  let [search, setSearch] = useState("");

  return (
    <div className="flex flex-col w-[70vw] bg-white rounded-[18px] p-5 gap-5">
      <MapContainer
        style={{ height: "70vh", width: "100%", borderRadius: "18px" }}
        center={[48.8566, 2.3488]}
        zoom={11.5}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
