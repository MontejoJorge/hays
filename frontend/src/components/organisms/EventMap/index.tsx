import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useEffect, useRef } from 'react';

import type { Event, Source } from '../../../types';

const defaultLocation: L.LatLngTuple = [40.4168, -3.7038]; // Madrid

interface EventMapProps {
  events: Event[];
  sources: Source[];
}

const iconCommonOptions = {
  iconSize: [25, 41] as [number, number],
  iconAnchor: [12, 41] as [number, number],
  popupAnchor: [1, -34] as [number, number],
  shadowSize: [41, 41] as [number, number],
};

const blueIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  ...iconCommonOptions,
});

const greenIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  ...iconCommonOptions,
});

export const EventMap = ({ events, sources }: EventMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const linesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (mapRef.current && !leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView(defaultLocation, 6);

      const googleStreets = L.tileLayer(
        'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
          maxZoom: 20,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        },
      );

      googleStreets.addTo(leafletMapRef.current);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (leafletMapRef.current) {
      const eventMarkers: L.Marker[] = [];
      const sourceMarkers: L.Marker[] = [];

      events.forEach((event) => {
        const marker = L.marker([event.location.lat, event.location.lon], {
          icon: blueIcon,
        });
        marker.addTo(leafletMapRef.current!);
        eventMarkers.push(marker);

        marker.on('click', () => {
          linesRef.current.forEach((line) => line.remove());
          linesRef.current = [];

          const source = sources.find((src) => src.id === event.sourceId);
          if (source) {
            const line = L.polyline(
              [
                [event.location.lat, event.location.lon],
                [source.location.lat, source.location.lon],
              ],
              {
                color: 'blue',
              },
            );
            line.addTo(leafletMapRef.current!);
            linesRef.current.push(line);
          }
        });
      });

      sources.forEach((source) => {
        const marker = L.marker([source.location.lat, source.location.lon], {
          icon: greenIcon,
        });
        marker.addTo(leafletMapRef.current!);
        sourceMarkers.push(marker);

        marker.on('click', () => {
          linesRef.current.forEach((line) => line.remove());
          linesRef.current = [];

          const relatedLines = events
            .filter((event) => event.sourceId === source.id)
            .map((event) => {
              const line = L.polyline(
                [
                  [event.location.lat, event.location.lon],
                  [source.location.lat, source.location.lon],
                ],
                {
                  color: 'blue',
                },
              );
              line.addTo(leafletMapRef.current!);
              return line;
            });

          linesRef.current.push(...relatedLines);
        });
      });
    }
  }, [events, sources]);

  return <div ref={mapRef} style={{ height: '80vh', width: '1000px' }} />;
};
