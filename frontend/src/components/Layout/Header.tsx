import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo} onClick={() => navigate('/')}>
          Trello Clone
        </h1>
        <nav className={styles.nav}>
          <button
            className={styles.navButton}
            onClick={() => navigate('/')}
          >
            My Boards
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;