import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';

import { getEvents } from '../../api/events';
import { getSources } from '../../api/sources';
import { EventMap } from '../../components/organisms/EventMap';
import type { Event, Pagination, Source } from '../../types';

const MapPage = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId') || undefined;

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

  const sourcesQuery = useQuery<Source[]>({
    queryKey: ['sources'],
    queryFn: getSources,
  });

  const allEvents = useMemo(
    () => eventsQuery.data?.pages.flatMap((page) => page.data) || [],
    [eventsQuery.data],
  );

  useEffect(() => {
    if (eventsQuery.hasNextPage && !eventsQuery.isFetchingNextPage) {
      eventsQuery.fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    eventsQuery.hasNextPage,
    eventsQuery.isFetchingNextPage,
    eventsQuery.fetchNextPage,
  ]);

  const isLoadingAll =
    eventsQuery.isLoading ||
    eventsQuery.isFetchingNextPage ||
    eventsQuery.hasNextPage ||
    sourcesQuery.isLoading;

  if (isLoadingAll) {
    return <div>Cargando mapa y eventos...</div>;
  }

  return (
    <>
      <div>
        Para poder ver las relacciones entre eventos y fuentes, haz click en un
        evento en el mapa.
      </div>
      <EventMap
        events={allEvents}
        sources={sourcesQuery.data || []}
        eventId={eventId}
      />
    </>
  );
};

export default MapPage;
