import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router';

import { getSources } from '../../../api/sources';
import type { Event, Source } from '../../../types';
import styles from './styles.module.scss';

interface EventsTableProps {
  data: Event[];
}

export const EventsTable = ({ data }: EventsTableProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: sources } = useQuery<Source[]>({
    queryKey: ['sources'],
    queryFn: getSources,
  });

  const handleHeaderClick = (column: string) => {
    const currentOrderBy = searchParams.get('orderBy');
    const currentOrderDirection = searchParams.get('orderDirection') || 'asc';

    if (currentOrderBy === column) {
      const newDirection = currentOrderDirection === 'asc' ? 'desc' : 'asc';
      setSearchParams({
        ...Object.fromEntries(searchParams),
        orderBy: column,
        orderDirection: newDirection,
      });
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams),
        orderBy: column,
        orderDirection: 'asc',
      });
    }
  };

  const renderHeader = (column: string, label: string) => {
    const currentOrderBy = searchParams.get('orderBy');
    const currentOrderDirection = searchParams.get('orderDirection');

    return (
      <th onClick={() => handleHeaderClick(column)}>
        {label}
        {currentOrderBy === column && (
          <span>{currentOrderDirection === 'asc' ? ' ▲' : ' ▼'}</span>
        )}
      </th>
    );
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          {renderHeader('id', 'ID')}
          {renderHeader('value', 'Value')}
          {renderHeader('sourceId', 'Source')}
          {renderHeader('timestamp', 'Timestamp')}
          {renderHeader('location', 'Location')}
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
              &nbsp;
              <Link
                to={`/map?eventId=${encodeURIComponent(event.id)}`}
                className={styles.link}
              >
                Ver en mapa
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
