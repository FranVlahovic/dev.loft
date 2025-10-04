import styles from './Navbar.module.css';

export default function Navbar({ title, description }) {
  return (
    <>
      <h1 className={styles.navbarTitle}>{title}</h1>
      <p className={styles.navbarDescription}>{description}</p>
    </>
  );
}
