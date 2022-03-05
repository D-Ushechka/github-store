import React, { useState } from 'react';

import GitHubStore from '@store/GitHubStore';
import RepoBranchesStore from '@store/RepoBranchesStore';
import { useLocalStore } from '@utils/useLocalStore';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
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
  const repoBranchesStore = useLocalStore(
    () => new RepoBranchesStore(gitHubStore)
  );

  React.useEffect(() => {
    repoBranchesStore.getRepoBranches({
      orgName: organization,
      repoName: name,
    });
  }, [name, organization, repoBranchesStore]);

  return (
    <Drawer
      onClose={onClose}
      visible={!!name}
      title={`Ветки репозитория ${name}`}
    >
      {repoBranchesStore.branchesList.map((it) => (
        <div key={it.name}>{it.name}</div>
      ))}
    </Drawer>
  );
};

export default React.memo(observer(RepoBranchesDrawer));
