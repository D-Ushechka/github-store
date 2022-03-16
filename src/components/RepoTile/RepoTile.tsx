import React from 'react';

import Avatar from '@components/Avatar';
import StarIcon from '@components/StarIcon';
import { RepoItemModel } from '@store/models';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import styles from './RepoTile.module.scss';

export type RepoTileProps = {
  item: RepoItemModel;
};

const RepoTile: React.FC<RepoTileProps> = ({ item }) => {
  return (
    <Link to={`/repos/${item.name}`}>
      <div
        className={`${styles['git-repo-tile']} ${styles['git-repo-tile_hover']}`}
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
              Updated {format(item.updatedAt, 'dd.MM.yyyy')}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default observer(RepoTile);
