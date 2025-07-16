import { Marker } from 'leaflet';

export interface EventMarker extends Marker {
  id: string;
}

export interface SourceMarker extends Marker {
  id: string;
}
