import React from 'react';

import { useReposContext } from '@pages/ReposSearchPage/ReposSearchPage';
import RepoBranchesStore from '@store/RepoBranchesStore';
import { useLocalStore } from '@utils/useLocalStore';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export type RepoBranchesDrawerProps = {
  onClose: () => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
  const { name } = useParams<{ name: string }>();
  const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());
  const reposContext = useReposContext();

  React.useEffect(() => {
    repoBranchesStore.getRepoBranches({
      orgName: reposContext.reposListStore.orgName,
      repoName: name,
    });
  }, [name, repoBranchesStore, reposContext.reposListStore.orgName]);

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
