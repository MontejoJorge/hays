import api from '.';

export interface GetEventsParams {
  sourceId?: string;
  startDate?: string; // ISO string, e.g. '2024-06-01T00:00:00Z'
  endDate?: string;   // ISO string
  minValue?: number;
  maxValue?: number;
  page?: number;
  pageSize?: number;
}

export const getEvents = async (params: GetEventsParams) => {
  const response = await api.get('/events', { params });
  return response.data;
};
