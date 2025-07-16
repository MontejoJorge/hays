import type { Event } from '../../../types';

interface EventsTableProps {
  data: Event[];
}

export const EventsTable = ({ data }: EventsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Value</th>
          <th>Timestamp</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr key={event.id}>
            <td>{event.id.split('-')[0]}</td>
            <td>{event.value}</td>
            <td>{new Date(event.timestamp).toLocaleString()}</td>
            <td>
              {event.location.lat.toFixed(2)}, {event.location.lon.toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
