import { useSearchParams } from 'react-router';

import styles from './style.module.scss';

export const EventsFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className={styles.filterContainer}>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={searchParams.get('id') || ''}
          onChange={(e) => updateFilter('id', e.target.value)}
          style={{ width: '150px' }}
        />
      </div>
      <div>
        <label htmlFor="value">Value:</label>
        <input
          type="number"
          id="value"
          value={searchParams.get('value') || ''}
          onChange={(e) => updateFilter('value', e.target.value)}
          style={{ width: '40px' }}
        />
      </div>
      <div>
        <label htmlFor="source">Source:</label>
        <input
          type="text"
          id="source"
          value={searchParams.get('source') || ''}
          onChange={(e) => updateFilter('source', e.target.value)}
          style={{ width: '80px' }}
        />
      </div>
      <div>
        <label htmlFor="dateStart">Start Date:</label>
        <input
          type="date"
          id="dateStart"
          value={searchParams.get('dateStart') || ''}
          onChange={(e) => updateFilter('dateStart', e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="dateEnd">End Date:</label>
        <input
          type="date"
          id="dateEnd"
          value={searchParams.get('dateEnd') || ''}
          onChange={(e) => updateFilter('dateEnd', e.target.value)}
        />
      </div>
    </div>
  );
};
