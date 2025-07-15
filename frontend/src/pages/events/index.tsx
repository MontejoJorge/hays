import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React from 'react';

import { getEvents } from '../../api/events';
import { Paginator } from '../../components/';
import type { Event, Pagination } from '../../types';

const EventsPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

  const { data } = useQuery<Pagination<Event>>({
    queryKey: ['events', currentPage],
    queryFn: () => getEvents({ page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <h1>Events Page</h1>
      <ul>
        {data?.data.map((event: Event) => (
          <li key={event.id}>
            <strong>{event.id}</strong> -{' '}
            {new Date(event.timestamp).toLocaleString()} - Value: {event.value}
          </li>
        ))}
      </ul>
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        fetchNextPage={() => handlePageChange(currentPage + 1)}
        fetchPreviousPage={() => handlePageChange(currentPage - 1)}
        hasNextPage={currentPage < totalPages}
        hasPreviousPage={currentPage > 1}
      />
    </>
  );
};

export default EventsPage;
