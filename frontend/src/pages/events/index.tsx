import type { ColumnDef } from '@tanstack/react-table';

import { Paginator } from '../../components/';
import Table from '../../components/Table';
import useEvents from '../../hooks/useEvents';
import type { Event } from '../../types';
import Sheet from '@mui/joy/Sheet/Sheet';

const EventsPage = () => {
  const { currentPage, totalPages, data, handlePageChange } = useEvents();

  const columns: ColumnDef<Event>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ getValue }) => (getValue() as string).split('-')[0],
    },
    {
      accessorKey: 'timestamp',
      header: 'Timestamp',
      cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
    },
    {
      accessorKey: 'value',
      header: 'Value',
    },
  ];

  return (
    <Sheet variant="soft">
      <h1>Events Page</h1>
      <Table data={data} columns={columns} />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        fetchNextPage={() => handlePageChange(currentPage + 1)}
        fetchPreviousPage={() => handlePageChange(currentPage - 1)}
        hasNextPage={currentPage < totalPages}
        hasPreviousPage={currentPage > 1}
      />
    </Sheet>
  );
};

export default EventsPage;
