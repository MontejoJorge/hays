import type { EventFilter } from '../types';
import { dateToOffsetDateTime } from '../utils';
import api from '.';

export const getEvents = async (params: EventFilter) => {
  const formattedParams = {
    ...params,
    startDate: dateToOffsetDateTime(params.startDate),
    endDate: dateToOffsetDateTime(params.endDate),
  };

  const response = await api.get('/events', { params: formattedParams });
  return response.data;
};
