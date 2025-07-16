import { EventsTable, Paginator } from '../../components/';
import useEvents from '../../hooks/useEvents';

const EventsPage = () => {
  const { currentPage, totalPages, data, setCurrentPage } = useEvents();

  return (
    <>
      <h1>Events Page</h1>
      <EventsTable data={data} />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        fetchNextPage={() => setCurrentPage(currentPage + 1)}
        fetchPreviousPage={() => setCurrentPage(currentPage - 1)}
        hasNextPage={currentPage < totalPages}
        hasPreviousPage={currentPage > 1}
      />
    </>
  );
};

export default EventsPage;
