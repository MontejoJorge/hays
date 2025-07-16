import { useQuery } from '@tanstack/react-query';

import { getSources } from '../../../api/sources';
import type { Event, Source } from '../../../types';
import styles from './styles.module.scss';

interface EventsTableProps {
  data: Event[];
}

export const EventsTable = ({ data }: EventsTableProps) => {
  const { data: sources } = useQuery<Source[]>({
    queryKey: ['sources'],
    queryFn: getSources,
  });

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>ID</th>
          <th>Value</th>
          <th>Source</th>
          <th>Timestamp</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr key={event.id} className={styles.tr}>
            <td className={styles.td}>{event.id.split('-')[0]}</td>
            <td className={styles.td}>{event.value}</td>
            <td className={styles.td}>
              {sources?.find((src) => src.id === event.sourceId)?.name}
            </td>
            <td className={styles.td}>
              {new Date(event.timestamp).toLocaleString()}
            </td>
            <td className={styles.td}>
              {event.location.lat.toFixed(2)}, {event.location.lon.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
