import { useEffect, useState } from 'react';
import styles from './Boards.module.css';
import { Link } from 'react-router-dom';

export default function TopBoards() {
  const [topCategories, setTopCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/categories/top')
      .then((res) => res.json())
      .then((data) => setTopCategories(data));
  }, []);

  return (
    <div className={styles.boardsSection}>
      <h2>top boards</h2>
      <div className={styles.boardsContainer}>
        <ul>
          {topCategories.map((category) => (
            <li key={category.id}>
              <Link to={`/${category.slug}/posts`}>
                <div className={styles.boardsCard}>
                  <div className={styles.boardsCardInfo}>
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                  </div>
                  <div className={styles.boardsCardCounter}>
                    <span>{category.post_count}</span>
                    <p>Posts</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
