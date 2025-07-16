import clsx from 'clsx';
import { Link, useLocation } from 'react-router';

import styles from './styles.module.scss';

const isActive = (pathname: string, currentPath: string): boolean =>
  pathname === currentPath;

export const NavBar = () => {
  const location = useLocation();

  return (
    <nav>
      <ul className={styles.navLinks}>
        <li>
          <Link
            to="/events"
            className={clsx({
              [styles.active]: isActive(location.pathname, '/events'),
            })}
          >
            Events
          </Link>
        </li>
        <li>
          <Link
            to="/map"
            className={clsx({
              [styles.active]: isActive(location.pathname, '/map'),
            })}
          >
            Map
          </Link>
        </li>
      </ul>
    </nav>
  );
};
