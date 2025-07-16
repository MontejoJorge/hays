import type { Event } from '../../../types';
import styles from './styles.module.scss';

interface EventsTableProps {
  data: Event[];
}

export const EventsTable = ({ data }: EventsTableProps) => {
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th>ID</th>
          <th>Value</th>
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
