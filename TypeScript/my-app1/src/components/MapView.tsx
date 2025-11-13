import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import type { FeatureCollection, Point } from "geojson";

const points: FeatureCollection<Point> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [121.034, 14.5995] },
      properties: { name: "Manila" },
    },
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [120.9843, 14.5995] },
      properties: { name: "Not Manila" },
    },
  ],
};

export default function MapView() {
  const center: LatLngExpression = [14.5995, 120.9842]

  return (
    <MapContainer
      center={center}
      zoom={10}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {points.features.map((f, i) => (
        <Marker
          key={i}
          position={[
            f.geometry.coordinates[1], // ✅ Leaflet expects [lat, lng]
            f.geometry.coordinates[0],
          ]}
        >
          <Popup>{f.properties?.name}</Popup> {/* ✅ correct JSX */}
        </Marker>
      ))}
    </MapContainer>
  );
}
