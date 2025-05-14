import React, { useState, useEffect } from 'react';

import styles from './Loader.module.scss';
import colors from '../../../../styles/_colors.scss';

const Loader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onPageLoad = () => {
    setIsLoading(false);
    document.documentElement.style.overflow = 'auto';
  };

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, []);

  return isLoading && (
    <section className={styles.container}>
      <svg className={styles.svg} viewBox="0 0 500 150">
        <defs>
          <text id="Text" x="100" y="100">Loading</text>
          <circle id="Circle" cx="100" cy="80" r="100" className={styles.circle} />
        </defs>

        <mask id="Mask">
          <use href="#Circle" fill={colors.loader_stroke} />
        </mask>

        <use href="#Text" fill={colors.loader_circle} mask="url(#Mask)" />
        <use href="#Text" stroke={colors.loader_stroke} strokeWidth=".75" strokeLinejoin="round" fill="none" />
      </svg>
    </section>
  );
};

export default Loader;
