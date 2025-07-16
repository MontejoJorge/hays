import styles from './style.module.scss';

export const EventsFilter = () => {
  return (
    <div className={styles.filterContainer}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" />
      </div>
      <div>
        <label htmlFor="source">Source:</label>
        <input type="text" id="source" />
      </div>
      <div>
        <label htmlFor="dateStart">Start Date:</label>
        <input type="date" id="dateStart" />
      </div>
      <div>
        <label htmlFor="dateEnd">End Date:</label>
        <input type="date" id="dateEnd" />
      </div>
    </div>
  );
};
