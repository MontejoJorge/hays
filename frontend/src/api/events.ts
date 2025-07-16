import type { EventFilter } from '../types';
import { dateToOffsetDateTime } from '../utils';
import api from '.';

export const getEvents = async (params: EventFilter) => {
  const formattedParams = {
    ...params,
    startDate: params.startDate ? dateToOffsetDateTime(params.startDate) : undefined,
    endDate: params.endDate ? dateToOffsetDateTime(params.endDate) : undefined,
  };

  const response = await api.get('/events', { params: formattedParams });
  return response.data;
};
