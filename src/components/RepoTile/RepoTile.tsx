import React from 'react';

import Avatar from 'components/Avatar';
import StarIcon from 'components/StarIcon';
import { RepoItemModel } from 'store/models';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import styles from './RepoTile.module.scss';

export type RepoTileProps = {
  item: RepoItemModel;
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
          src={item.owner.avatarUrl}
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
              <p className={styles.stars__p}>{item.stargazersCount}</p>
            </div>
            <div className={styles.date}>
              Updated{' '}
              {item.updatedAt.getDate().toString().padStart(2, '0') +
                '.' +
                (item.updatedAt.getMonth() + 1).toString().padStart(2, '0') +
                '.' +
                item.updatedAt.getFullYear()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(observer(RepoTile));
