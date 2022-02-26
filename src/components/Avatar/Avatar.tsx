import React from 'react';

import styles from './Avatar.module.scss';

export type AvatarProps = {
  src?: string;
  alt?: string;
  letter?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  if (!src) {
    return <div className={styles['avatar avatar_accent']}>{letter}</div>;
  }

  return <img className={styles.avatar} src={src} alt={alt} />;
};

export default React.memo(Avatar);
