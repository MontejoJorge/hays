import { NavBar } from './components/molecules/NavBar';
import AppRoutes from './routes';
import styles from './styles.module.scss';

const App = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <AppRoutes />
    </div>
  );
};

export default App;
