export interface EventLocation {
  lat: number;
  lon: number;
}

export interface Event {
  id: string;
  sourceId: string;
  timestamp: string;
  value: number;
  location: EventLocation;
}
