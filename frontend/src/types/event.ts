import type { Location } from './generic';

export interface Event {
  id: string;
  sourceId: string;
  timestamp: string;
  value: number;
  location: Location;
}
