import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItem } from '@store/GitHubStore/types';
import { Link } from 'react-router-dom';

import styles from './RepoTile.module.scss';

export type RepoTileProps = {
  item: RepoItem;
  onClick?: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <Link to={`/repos/${item.name}`}>
      <div
        className={`${styles['git-repo-tile']} ${styles['git-repo-tile_hover']}`}
        onClick={onClick}
      >
        <Avatar
          src={item.owner.avatar_url}
          alt="avatar"
          letter={
            item.owner.login.length
              ? item.owner.login[0].toUpperCase()
              : undefined
          }
        />
        <div className={styles.content}>
          <div className={styles['repo-name']}>{item.name}</div>
          <div className={`${styles['org-name']} ${styles['org-name_hover']}`}>
            {item.owner.login}
          </div>
          <div className={styles.info}>
            <div className={styles.stars}>
              <StarIcon />
              <p className={styles.stars__p}>{item.stargazers_count}</p>
            </div>
            <div className={styles.date}>
              Updated{' '}
              {item.updated_at.slice(8, 10) +
                '.' +
                item.updated_at.slice(5, 7) +
                '.' +
                item.updated_at.slice(0, 4)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(RepoTile);
