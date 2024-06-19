import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <div className="flex flex-col w-[60vw] bg-white rounded-[18px] p-5 gap-5">
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
        placeholder="Search"
        className="w-full rounded-[18px]"
      />
    </div>
  );
}
