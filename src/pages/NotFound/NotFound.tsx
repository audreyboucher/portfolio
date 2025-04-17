import React from 'react';

import { Button } from '../../components/common/ui';

import styles from './NotFound.module.scss';

const NotFound = () => (
  <section className={styles.container}>
    <div>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Sorry! This page cannot be found</h2>
      <p className={styles.paragraph}>The page you are looking for doesn’t exist or has been moved</p>
      <Button text="Go to the homepage" onClick={() => { window.location.href = '/'; }} />
    </div>
  </section>
);

export default NotFound;
