import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getEvents } from '../../api/events';
import { EventMap } from '../../components/organisms/EventMap';
import type { Pagination } from '../../types';

const MapPage = () => {
  const filter = { pageSize: 100 };

  const eventsQuery = useInfiniteQuery<Pagination<Event>>({
    queryKey: ['events'],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) =>
      getEvents({ ...filter, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage && lastPage.nextPage > 0) {
        return lastPage.nextPage;
      }
      return undefined;
    },
  });

  useEffect(() => {
    const fetchAllPages = () => {
      while (eventsQuery.hasNextPage) {
        eventsQuery.fetchNextPage();
      }
    };
    if (eventsQuery.hasNextPage) {
      fetchAllPages();
    }
  }, [eventsQuery.hasNextPage]);

  return (
    <>
      <EventMap />
    </>
  );
};

export default MapPage;
