import type { EventFilter } from '../types';
import api from '.';

export const getEvents = async (params: EventFilter) => {
  const response = await api.get('/events', { params });
  return response.data;
};
