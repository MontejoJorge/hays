interface Event {
  id: string;
  timestamp: string;
  value: number;
}

interface EventsTableProps {
  data: Event[];
}

export const EventsTable = ({ data }: EventsTableProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Timestamp</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr key={event.id}>
            <td>{event.id.split('-')[0]}</td>
            <td>{new Date(event.timestamp).toLocaleString()}</td>
            <td>{event.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
