import { createContext, useContext, useState } from 'react';
import React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoBranchesDrawer from '@components/RepoBranchesDrawer';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import GitHubStore from '@store/GitHubStore/GitHubStore';
import { RepoItem } from '@store/GitHubStore/types';
import ReposListStore from '@store/ReposListStore';
import { Meta } from '@utils/meta';
import { useLocalStore } from '@utils/useLocalStore';
import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import styles from './ReposSearchPage.module.scss';

export type ReposContext = {
  repoList?: RepoItem[];
  isLoading?: boolean;
  getOrgReposList?: () => void;
};

const reposContext = createContext<ReposContext>({
  repoList: [],
  isLoading: false,
  getOrgReposList: () => {},
});

const Provider = reposContext.Provider;

export const useReposContext = () => useContext(reposContext);

const ReposSearchPage = () => {
  const gitHubStore = useLocalStore(() => new GitHubStore());
  const reposListStore = useLocalStore(() => new ReposListStore(gitHubStore));

  React.useEffect(() => {
    reposListStore.getOrgReposList(false);
  }, [reposListStore]);

  const onChange = (value: string) => {
    reposListStore.orgName = value;
  };

  const history = useHistory();

  const closeRepoBranchesDrawer = () => {
    history.push('/repos');
  };

  const buttonClick = (e: React.MouseEvent) => {
    reposListStore.getOrgReposList(false);
  };

  const getReposListMore = async () => {
    reposListStore.getOrgReposList(true);
  };

  return (
    <Provider value={{}}>
      <RepoBranchesDrawer
        organization={reposListStore.orgName}
        onClose={closeRepoBranchesDrawer}
        gitHubStore={gitHubStore}
      />
      <div className={styles.container}>
        <div className={styles['search-bar']}>
          <Input value={reposListStore.orgName} onChange={onChange} />
          <Button
            onClick={buttonClick}
            disabled={reposListStore.meta === Meta.loading}
          >
            <SearchIcon className={styles['search-icon']} />
          </Button>
        </div>

        <InfiniteScroll
          dataLength={reposListStore.repoList.length}
          next={getReposListMore}
          hasMore={reposListStore.hasMore}
          loader={<h4>Loading...</h4>}
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
      </div>
    </Provider>
  );
};

export default observer(ReposSearchPage);
