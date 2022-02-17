import React from 'react';

import Avatar from '@components/Avatar';
import './RepoTile.css';
import StarIcon from '@components/StarIcon';

type RepoItem = {
  repoName: string;
  orgName: string;
  star: number;
  date: string;
  src?: string;
};

export type RepoTileProps = {
  item: RepoItem;
  onClick?: (e: React.MouseEvent) => void;
};

const RepoTile: React.FC<RepoTileProps> = ({ item, onClick }) => {
  return (
    <div className="git-repo-tile git-repo-tile_hover" onClick={onClick}>
      <Avatar
        src={item.src}
        alt="avatar"
        letter={item.orgName[0].toUpperCase()}
      />
      <div className="content">
        <div className="repo-name">{item.repoName}</div>
        <div className="org-name org-name_hover">{item.orgName}</div>
        <div className="info">
          <div className="stars">
            <StarIcon />
            <p className="stars__p">{item.star}</p>
          </div>
          <div className="date">Updated {item.date}</div>
        </div>
      </div>
    </div>
  );
};

export default RepoTile;
