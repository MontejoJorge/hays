import { EventsFilter, EventsTable, Paginator } from '../../components/';
import styles from './style.module.scss';
import useEvents from './useEvents';

const EventsPage = () => {
  const { totalPages, data, currentPage } = useEvents();

  return (
    <div className={styles.container}>
      <h1>Events Page</h1>
      <EventsFilter />
      <EventsTable data={data} />
      <Paginator
        totalPages={totalPages}
        currentPage={currentPage}
        hasNextPage={currentPage < totalPages}
        hasPreviousPage={currentPage > 1}
      />
    </div>
  );
};

export default EventsPage;
