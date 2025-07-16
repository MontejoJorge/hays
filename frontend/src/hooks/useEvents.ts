import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getEvents } from '../api/events';
import type { Event, Pagination } from '../types';

const useEvents = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data } = useQuery<Pagination<Event>>({
    queryKey: ['events', currentPage],
    queryFn: () => getEvents({ page: currentPage }),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    data: data?.data || [],
    handlePageChange,
  };
};

export default useEvents;
