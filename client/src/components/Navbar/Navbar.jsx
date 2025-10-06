import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar({ category }) {
  return (
    <nav className={styles.navbar}>
      <ol className={styles.navbarList}>
        <li className={styles.navbarLink}>
          <Link to="/">home</Link>
        </li>
        {category && (
          <>
            <li className={styles.navbarLink}>
              <span>&gt;</span>
            </li>
            <li className={styles.navbarLink}>
              <Link to={`${category.slug}/posts`}>{category.title}</Link>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
