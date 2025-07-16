import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useEffect, useRef, useState } from 'react';

import type { Event, EventMarker, Source, SourceMarker } from '../../../types';
import {
  createEventClickHandler,
  createSourceClickHandler,
  ResetMapButton,
} from './util';

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

const defaultLocation: L.LatLngTuple = [40.4168, -3.7038]; // Madrid

interface EventMapProps {
  events: Event[];
  sources: Source[];
}

export const EventMap = ({ events, sources }: EventMapProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const linesRef = useRef<L.Polyline[]>([]);
  const [eventMarkers, setEventMarkers] = useState<EventMarker[]>([]);
  const [sourceMarkers, setSourceMarkers] = useState<SourceMarker[]>([]);
  const [resetKey, setResetKey] = useState(0);

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    leafletMapRef.current = L.map(mapRef.current).setView(defaultLocation, 6);

    const googleStreets = L.tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      },
    );

    googleStreets.addTo(leafletMapRef.current);

    const resetMapButton = new ResetMapButton(
      linesRef,
      leafletMapRef,
      setResetKey,
      {
        position: 'topright',
      },
    );
    resetMapButton.addTo(leafletMapRef.current);

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []);

  // Create markers
  useEffect(() => {
    events.forEach((event) => {
      const marker = L.marker([event.location.lat, event.location.lon], {
        icon: blueIcon,
      }) as EventMarker;
      marker.id = event.id;
      setEventMarkers((prev) => [...prev, marker]);
    });

    sources.forEach((source) => {
      const marker = L.marker([source.location.lat, source.location.lon], {
        icon: greenIcon,
      }) as SourceMarker;
      marker.id = source.id;
      setSourceMarkers((prev) => [...prev, marker]);
    });
  }, [events, sources, resetKey]);

  // Add markers to the map
  useEffect(() => {
    if (!leafletMapRef.current) return;
    eventMarkers.forEach((marker) => {
      marker.addTo(leafletMapRef.current!);
    });
    sourceMarkers.forEach((marker) => {
      marker.addTo(leafletMapRef.current!);
    });
  }, [eventMarkers, sourceMarkers]);

  // Create markers click handlers
  useEffect(() => {
    if (!leafletMapRef.current) return;

    eventMarkers.forEach((marker) => {
      createEventClickHandler(
        marker,
        setEventMarkers,
        setSourceMarkers,
        events,
        sources,
        leafletMapRef,
        linesRef,
      );
    });

    sourceMarkers.forEach((marker) => {
      createSourceClickHandler(
        marker,
        setSourceMarkers,
        setEventMarkers,
        events,
        leafletMapRef,
        linesRef,
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventMarkers, sourceMarkers]);

  return <div ref={mapRef} style={{ height: '80vh', width: '1000px' }} />;
};
