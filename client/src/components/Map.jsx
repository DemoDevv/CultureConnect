import { MapContainer } from "react-leaflet";
import { TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <div>
      <MapContainer
        style={{ height: "70vh", width: "60vw" }}
        center={[48.8566, 2.3488]}
        zoom={11.5}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
}
