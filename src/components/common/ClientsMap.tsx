'use client';

import dynamic from 'next/dynamic';
import type { MapMarker } from './MapView';

const MapView = dynamic(() => import('./MapView'), {
  ssr: false,
  loading: () => <div className="h-80 w-full rounded-xl bg-gray-100 animate-pulse" />,
});

export default function ClientsMap({ markers }: { markers: MapMarker[] }) {
  if (markers.length === 0) return null;
  return (
    <MapView
      center={[markers[0].lat, markers[0].lng]}
      zoom={11}
      markers={markers}
      className="h-80 w-full rounded-xl border"
    />
  );
}
