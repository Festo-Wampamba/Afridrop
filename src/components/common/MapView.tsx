'use client';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Leaflet's default marker icons break under bundlers; point them at the CDN
// (loads as https images, allowed by the app's CSP img-src).
const iconProto = L.Icon.Default.prototype as { _getIconUrl?: unknown };
delete iconProto._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export type MapMarker = { lat: number; lng: number; label?: string };

export default function MapView({
  center,
  zoom = 14,
  markers = [],
  className = 'h-80 w-full rounded-xl',
}: {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
}) {
  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((m, i) => (
        <Marker key={`${m.lat}-${m.lng}-${i}`} position={[m.lat, m.lng]}>
          {m.label ? <Popup>{m.label}</Popup> : null}
        </Marker>
      ))}
    </MapContainer>
  );
}
