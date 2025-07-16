import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';

import type { Event, EventMarker, Source, SourceMarker } from '../../../types';

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
  const [eventMarkers, setEventMarkers] = useState<EventMarker[]>([]);
  const [sourceMarkers, setSourceMarkers] = useState<SourceMarker[]>([]);

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
    if (!leafletMapRef.current) return;
    drawEventsMarkers(events, setEventMarkers, leafletMapRef);
    drawSourcesMarkers(sources, setSourceMarkers, leafletMapRef);
  }, [events, sources]);

  useEffect(() => {
    if (!leafletMapRef.current) return;

    eventMarkers.forEach((marker) => {
      marker.on('click', () => {
        linesRef.current.forEach((line) => line.remove());
        linesRef.current = [];

        const event = events.find((evt) => evt.id === marker.id);
        const source = sources.find((src) => event?.sourceId === src.id);
        if (!event || !source) return;

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
      });
    });

    sourceMarkers.forEach((marker) => {
      marker.on('click', () => {
        linesRef.current.forEach((line) => line.remove());
        linesRef.current = [];

        const relatedEvents = events.filter(
          (event) => event.sourceId === marker.id,
        );

        const relatedLines = relatedEvents.map((event) => {
          const line = L.polyline(
            [
              [event.location.lat, event.location.lon],
              [marker.getLatLng().lat, marker.getLatLng().lng],
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventMarkers, sourceMarkers]);

  return <div ref={mapRef} style={{ height: '80vh', width: '1000px' }} />;
};

const drawEventsMarkers = (
  events: Event[],
  setEventMarkers: React.Dispatch<React.SetStateAction<EventMarker[]>>,
  leafletMapRef: React.RefObject<L.Map | null>,
) => {
  events.forEach((event) => {
    const marker = L.marker([event.location.lat, event.location.lon], {
      icon: blueIcon,
    }) as EventMarker;
    marker.id = event.id;
    marker.addTo(leafletMapRef.current!);
    setEventMarkers((prev) => [...prev, marker]);
  });
};

const drawSourcesMarkers = (
  sources: Source[],
  setSourceMarkers: React.Dispatch<React.SetStateAction<SourceMarker[]>>,
  leafletMapRef: React.RefObject<L.Map | null>,
) => {
  sources.forEach((source) => {
    const marker = L.marker([source.location.lat, source.location.lon], {
      icon: greenIcon,
    }) as SourceMarker;
    marker.id = source.id;
    marker.addTo(leafletMapRef.current!);
    setSourceMarkers((prev) => [...prev, marker]);
  });
};
