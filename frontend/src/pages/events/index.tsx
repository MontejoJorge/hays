import { useInfiniteQuery } from '@tanstack/react-query';

import { getEvents } from '../../api/events';
import type { Event, Pagination } from '../../types';

const EventsPage = () => {
  const query = useInfiniteQuery<Pagination<Event>, Error>({
    queryKey: ['events'],
    queryFn: ({ pageParam = 1 }) => getEvents({ page: pageParam as number }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage || undefined;
    },
  });

  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {query.data?.pages.map((page) =>
          page.data.map((event) => (
            <li key={event.id}>
              <strong>{event.id}</strong> -{' '}
              {new Date(event.timestamp).toLocaleString()} - Value:{' '}
              {event.value}
            </li>
          )),
        )}
      </ul>
    </>
  );
};

export default EventsPage;
