import React from 'react';

import styles from './Loader.module.scss';

export type LoaderProps = {
  visible: boolean;
};

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  if (visible) return <div className={styles.loader}></div>;
  else return <div className={styles.unvisible}></div>;
};

export default Loader;
