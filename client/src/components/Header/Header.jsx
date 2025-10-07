import styles from './Header.module.css';

export default function Header({ title, description }) {
  return (
    <header>
      <h1 className={styles.headerTitle}>{title}</h1>
      <p className={styles.headerDescription}>{description}</p>
    </header>
  );
}
