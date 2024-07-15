import styles from './styles.module.css';
import { Add } from '../Icons/Add';
import { Home } from '../Icons/Home';
import { Profile } from '../Icons/Profile';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <Link to='/'>
        <Home />
      </Link>
      <Link to='/upload'>
        {' '}
        <Add />
      </Link>
      <Profile />
    </div>
  );
}
