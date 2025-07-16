import L from 'leaflet';

import type { Event, EventMarker, Source, SourceMarker } from '../../../types';

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

export const drawEventsMarkers = (
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

export const drawSourcesMarkers = (
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

export const createEventClickHandler = (
  eventMarker: EventMarker,
  events: Event[],
  sources: Source[],
  leafletMapRef: React.RefObject<L.Map | null>,
  linesRef: React.RefObject<L.Polyline[]>,
) => {
  eventMarker.on('click', () => {
    if (!leafletMapRef.current) return;

    linesRef.current.forEach((line) => line.remove());
    linesRef.current = [];

    const event = events.find((evt) => evt.id === eventMarker.id);
    const source = sources.find((src) => event?.sourceId === src.id);
    if (!event || !source) return;

    const line = L.polyline(
      [
        [event.location.lat, event.location.lon],
        [source.location.lat, source.location.lon],
      ],
      { color: 'blue' },
    );
    line.addTo(leafletMapRef.current);
    linesRef.current.push(line);
  });
};

export const createSourceClickHandler = (
  sourceMarker: SourceMarker,
  events: Event[],
  leafletMapRef: React.RefObject<L.Map | null>,
  linesRef: React.RefObject<L.Polyline[]>,
) => {
  sourceMarker.on('click', () => {
    if (!leafletMapRef.current) return;

    linesRef.current.forEach((line) => line.remove());
    linesRef.current = [];

    const sourceLatLng = sourceMarker.getLatLng();

    const relatedEvents = events.filter(
      (event) => event.sourceId === sourceMarker.id,
    );

    const lines = relatedEvents.map((event) => {
      const line = L.polyline(
        [
          [event.location.lat, event.location.lon],
          [sourceLatLng.lat, sourceLatLng.lng],
        ],
        { color: 'blue' },
      );
      line.addTo(leafletMapRef.current!);
      return line;
    });

    linesRef.current.push(...lines);
  });
};
