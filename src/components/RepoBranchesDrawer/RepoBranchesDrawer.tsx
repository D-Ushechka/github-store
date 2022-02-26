import React, { useState } from 'react';

import GitHubStore from '@store/GitHubStore';
import { BranchItem } from '@store/GitHubStore/types';
import { Drawer } from 'antd';
import { useParams } from 'react-router-dom';

export type RepoBranchesDrawerProps = {
  organization: string;
  onClose: () => void;
  gitHubStore: GitHubStore;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
  organization,
  onClose,
  gitHubStore,
}) => {
  const { name } = useParams<{ name: string }>();
  const [branchesList, setBranchesList] = useState<BranchItem[]>([]);

  const getRepoBranches = async (gitHubStore: GitHubStore) => {
    if (!name) return;

    const result = await gitHubStore.getBranchesList({
      owner: organization,
      repo: name,
    });
    result.success ? setBranchesList(result.data) : setBranchesList([]);
  };

  React.useEffect(() => {
    if (!name) return;
    getRepoBranches(gitHubStore);
  }, [name]);

  return (
    <Drawer
      onClose={onClose}
      visible={!!name}
      title={`Ветки репозитория ${name}`}
    >
      {branchesList.map((it) => (
        <div key={it.name}>{it.name}</div>
      ))}
    </Drawer>
  );
};

export default React.memo(RepoBranchesDrawer);
