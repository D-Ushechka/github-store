import React from 'react';

import ErrorComponent from '@components/ErrorComponent';
import Loader from '@components/Loader';
import { useReposContext } from '@pages/ReposSearchPage/ReposSearchPage';
import RepoBranchesStore from '@store/RepoBranchesStore';
import { Meta } from '@utils/meta';
import { useLocalStore } from '@utils/useLocalStore';
import { Drawer } from 'antd';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

export type RepoBranchesDrawerProps = {
  onClose: () => void;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({ onClose }) => {
  const { name } = useParams<{ name: string }>();
  const reposContext = useReposContext();
  const repoBranchesStore = useLocalStore(
    () => new RepoBranchesStore(reposContext.reposListStore.orgName)
  );

  React.useEffect(() => {
    repoBranchesStore.setRepoName(name);
  }, [name, repoBranchesStore]);

  return (
    <Drawer
      onClose={onClose}
      visible={!!name}
      title={`Ветки репозитория ${name}`}
    >
      {repoBranchesStore.meta !== Meta.error &&
        repoBranchesStore.branchesList.map((it) => (
          <div key={it.name}>{it.name}</div>
        ))}
      {repoBranchesStore.meta === Meta.loading && <Loader />}
      {repoBranchesStore.meta === Meta.error && <ErrorComponent />}
    </Drawer>
  );
};

export default observer(RepoBranchesDrawer);
