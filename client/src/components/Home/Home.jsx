import { useEffect } from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Boards from '../Boards/Boards';
import TopBoards from '../Boards/TopBoards';
import styles from './Home.module.css';

export default function Home() {
  useEffect(() => {
    document.title = 'dev.loft - for devs to share';
  }, []);
  return (
    <main>
      <Header
        title="dev.loft"
        description="This forum is made in order for people to share knowledge regarding development"
      />
      <div className={styles.homeSection}>
        <Navbar />
        <Boards />
        <TopBoards />
      </div>
    </main>
  );
}
