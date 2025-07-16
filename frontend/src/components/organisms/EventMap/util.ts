import L from 'leaflet';

import type { Event, EventMarker, Source, SourceMarker } from '../../../types';

export const createEventClickHandler = (
  eventMarker: EventMarker,
  setEventMarkers: React.Dispatch<React.SetStateAction<EventMarker[]>>,
  setSourceMarkers: React.Dispatch<React.SetStateAction<SourceMarker[]>>,
  events: Event[],
  sources: Source[],
  leafletMapRef: React.RefObject<L.Map | null>,
  linesRef: React.RefObject<L.Polyline[]>,
) => {
  eventMarker.on('click', () => {
    if (!leafletMapRef.current) return;

    // remove all other event markers
    setEventMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        if (marker !== eventMarker) {
          marker.remove();
        }
      });
      return [eventMarker];
    });

    linesRef.current.forEach((line) => line.remove());
    linesRef.current = [];

    const event = events.find((evt) => evt.id === eventMarker.id);
    const source = sources.find((src) => event?.sourceId === src.id);
    if (!event || !source) return;

    // remove all other source markers
    setSourceMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        if (marker.id !== source.id) {
          marker.remove();
        }
      });
      const sourceMarker = prevMarkers.find(
        (marker) => marker.id === source.id,
      );
      return sourceMarker ? [sourceMarker] : [];
    });

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
  setSourceMarkers: React.Dispatch<React.SetStateAction<SourceMarker[]>>,
  setEventMarkers: React.Dispatch<React.SetStateAction<EventMarker[]>>,
  events: Event[],
  leafletMapRef: React.RefObject<L.Map | null>,
  linesRef: React.RefObject<L.Polyline[]>,
) => {
  sourceMarker.on('click', () => {
    if (!leafletMapRef.current) return;

    // remove all other source markers
    setSourceMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        if (marker !== sourceMarker) {
          marker.remove();
        }
      });
      return [sourceMarker];
    });

    linesRef.current.forEach((line) => line.remove());
    linesRef.current = [];

    const sourceLatLng = sourceMarker.getLatLng();

    const relatedEvents = events.filter(
      (event) => event.sourceId === sourceMarker.id,
    );

    // remove all other event markers
    setEventMarkers((prevMarkers) => {
      prevMarkers.forEach((marker) => {
        if (!relatedEvents.some((event) => event.id === marker.id)) {
          marker.remove();
        }
      });
      return prevMarkers.filter((marker) =>
        relatedEvents.some((event) => event.id === marker.id),
      );
    });

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

export class ResetMapButton extends L.Control {
  linesRef: React.RefObject<L.Polyline[]>;
  leafletMapRef: React.RefObject<L.Map | null>;
  setResetKey: React.Dispatch<React.SetStateAction<number>>;

  constructor(
    linesRef: React.RefObject<L.Polyline[]>,
    leafletMapRef: React.RefObject<L.Map | null>,
    setResetKey: React.Dispatch<React.SetStateAction<number>>,
    options?: L.ControlOptions,
  ) {
    super(options);
    this.linesRef = linesRef;
    this.leafletMapRef = leafletMapRef;
    this.setResetKey = setResetKey;
  }

  onAdd() {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

    const btn = L.DomUtil.create('a', '', container);
    btn.innerHTML = 'Reset';
    btn.style.paddingLeft = '10px';
    btn.style.paddingRight = '10px';
    btn.style.cursor = 'pointer';

    L.DomEvent.on(btn, 'click', (e) => {
      L.DomEvent.preventDefault(e);
      L.DomEvent.stopPropagation(e);

      if (this.linesRef.current) {
        this.linesRef.current.forEach((line) => line.remove());
        this.linesRef.current = [];
      }

      if (this.leafletMapRef.current) {
        this.leafletMapRef.current.setView([40.4168, -3.7038], 6); // Default location and zoom

        this.setResetKey((prevKey) => prevKey + 1);
      }
    });

    return container;
  }
}
