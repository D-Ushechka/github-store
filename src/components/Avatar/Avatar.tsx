import React from 'react';
import './Avatar.css';

export type AvatarProps = {
  src?: string;
  alt?: string;
  letter?: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt, letter }) => {
  if (!src) {
    return <div className="avatar avatar_accent">{letter}</div>;
  }

  return <img className="avatar" src={src} alt={alt} />;
};

export default React.memo(Avatar);
