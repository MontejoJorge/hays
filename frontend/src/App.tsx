import AppRoutes from './routes';
import styles from './styles.module.scss';

const App = () => {
  return (
    <div className={styles.container}>
      <AppRoutes />
    </div>
  );
};

export default App;
