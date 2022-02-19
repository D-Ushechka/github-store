import React, { useState } from 'react';

import GitHubStore from '@store/GitHubStore';
import { BranchItem, RepoItem } from '@store/GitHubStore/types';
import { Drawer } from 'antd';

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose?: (e: any) => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
}) => {
  const [branchesList, setBranchesList] = useState<BranchItem[]>([]);

  React.useEffect(() => {
    if (!selectedRepo) return;

    const gitHubStore = new GitHubStore();
    gitHubStore
      .getBranchesList({
        owner: selectedRepo.owner.login,
        repo: selectedRepo.name,
      })
      .then((result) => {
        if (result.success) {
          setBranchesList(result.data);
        } else setBranchesList([]);
      });
  }, []);

  return (
    <Drawer
      onClose={onClose}
      visible={true}
      title={<div>Ветки репозитория {selectedRepo?.name}</div>}
    >
      {branchesList.map((it) => (
        <div key={it.name}>{it.name}</div>
      ))}
    </Drawer>
  );
};

export default RepoBranchesDrawer;
