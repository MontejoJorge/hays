import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';

import { getEvents } from '../../api/events';
import type { Event, EventFilter, Pagination } from '../../types';

const useEvents = () => {
  const [searchParams] = useSearchParams();

  const filter: EventFilter = {
    id: searchParams.get('id') || '',
    sourceId: searchParams.get('sourceId') || '',
    value: searchParams.get('value') || '',
    startDate: searchParams.get('dateStart') || '',
    endDate: searchParams.get('dateEnd') || '',
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
  };

  const { data } = useQuery<Pagination<Event>>({
    queryKey: ['events', filter],
    queryFn: () => getEvents(filter),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;
  const currentPage = filter.page;

  return {
    data: data?.data || [],
    totalPages,
    currentPage,
  };
};

export default useEvents;
