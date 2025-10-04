import { useState } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const [instagramNotification, setInstagramNotification] = useState(false);

  function displayInstagramNotification() {
    setInstagramNotification(true);

    setTimeout(() => {
      setInstagramNotification(false);
    }, 3000);
  }

  return (
    <footer>
      <ul className={styles.footerSocials}>
        <li>
          <a href="https://github.com/FranVlahovic" target="_blank">
            <img src="/src/assets/icons/github.svg" alt="Github Icon" />
          </a>
        </li>
        <li>
          <a onClick={() => displayInstagramNotification}>
            <img src="/src/assets/icons/instagram.svg" alt="Instagram Icon" />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/franvlahovic/" target="_blank">
            <img src="/src/assets/icons/linkedin.svg" alt="LinkedIn Icon" />
          </a>
        </li>
      </ul>
      <div className={styles.footerCopyright}>
        <p>
          ©Copyright 2025. All rights reserved.
          <br />
          Made by FranVlahovic
        </p>
      </div>

      {instagramNotification && (
        <div className={styles.footerNotification}>
          <p>Our GPT based intern is still figuring out how to `git push` our Instagram feature.</p>
        </div>
      )}
    </footer>
  );
}
