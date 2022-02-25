import React, { useState } from 'react';

import GitHubStore from '@store/GitHubStore';
import { BranchItem, RepoItem } from '@store/GitHubStore/types';
import { Drawer } from 'antd';

export type RepoBranchesDrawerProps = {
  selectedRepo: RepoItem | null;
  onClose: () => void;
  gitHubStore: GitHubStore;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  selectedRepo,
  onClose,
  gitHubStore,
}) => {
  const [branchesList, setBranchesList] = useState<BranchItem[]>([]);

  const getRepoBranches = async (gitHubStore: GitHubStore) => {
    if (!selectedRepo) return;

    const result = await gitHubStore.getBranchesList({
      owner: selectedRepo.owner.login,
      repo: selectedRepo.name,
    });
    result.success ? setBranchesList(result.data) : setBranchesList([]);
  };

  React.useEffect(() => {
    if (!selectedRepo) return;
    getRepoBranches(gitHubStore);
  }, [selectedRepo]);

  return (
    <Drawer
      onClose={onClose}
      visible={!!selectedRepo}
      title={`Ветки репозитория ${selectedRepo?.name}`}
    >
      {branchesList.map((it) => (
        <div key={it.name}>{it.name}</div>
      ))}
    </Drawer>
  );
};

export default React.memo(RepoBranchesDrawer);
