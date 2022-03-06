import { createContext, useContext } from 'react';
import React from 'react';

import Button from '@components/Button';
import ErrorComponent from '@components/ErrorComponent';
import Input from '@components/Input';
import Loader from '@components/Loader';
import RepoBranchesDrawer from '@components/RepoBranchesDrawer';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import ReposListStore from '@store/ReposListStore';
import { Meta } from '@utils/meta';
import { useLocalStore } from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import styles from './ReposSearchPage.module.scss';

export type ReposContext = {
  reposListStore: ReposListStore;
};

const reposContext = createContext<ReposContext>({
  reposListStore: new ReposListStore(),
});

const Provider = reposContext.Provider;

export const useReposContext = () => useContext(reposContext);

const ReposSearchPage = () => {
  const reposListStore = useLocalStore(() => new ReposListStore());

  React.useEffect(() => {
    reposListStore.getReposListInit();
  }, [reposListStore]);

  const onChange = React.useCallback(
    (value: string) => {
      reposListStore.orgName = value;
    },
    [reposListStore]
  );

  const history = useHistory();

  const closeRepoBranchesDrawer = React.useCallback(() => {
    history.push('/repos');
  }, [history]);

  return (
    <Provider value={{ reposListStore }}>
      <RepoBranchesDrawer onClose={closeRepoBranchesDrawer} />
      <div className={styles.container}>
        <div className={styles['search-bar']}>
          <Input value={reposListStore.orgName} onChange={onChange} />
          <Button
            onClick={reposListStore.getReposListInit}
            disabled={reposListStore.meta === Meta.loading}
          >
            <SearchIcon className={styles['search-icon']} />
          </Button>
        </div>

        <InfiniteScroll
          dataLength={reposListStore.repoList.length}
          next={reposListStore.getReposListMore}
          hasMore={reposListStore.hasMore}
          loader={<p></p>}
          endMessage={
            <p className={styles['end-message']}>
              <b>You have seen it all</b>
            </p>
          }
        >
          <div className={styles['repos-list']}>
            {reposListStore.repoList.map((it) => (
              <RepoTile key={it.id} item={it} />
            ))}
          </div>
        </InfiniteScroll>
        <Loader visible={reposListStore.meta === Meta.loading} />
        <ErrorComponent visible={reposListStore.meta === Meta.error} />
      </div>
    </Provider>
  );
};

export default observer(ReposSearchPage);
