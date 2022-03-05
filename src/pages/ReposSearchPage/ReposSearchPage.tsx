import { createContext, useContext, useState } from 'react';
import React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoBranchesDrawer from '@components/RepoBranchesDrawer';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import GitHubStore from '@store/GitHubStore/GitHubStore';
import { RepoItem } from '@store/GitHubStore/types';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';

import styles from './ReposSearchPage.module.scss';

export type ReposContext = {
  repoList: RepoItem[];
  isLoading: boolean;
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
  const [enteredText, setEnteredText] = useState('ktsstudio');
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getOrgReposList = async (initial: boolean) => {
    setIsLoading(true);
    if (initial) {
      setPage((prevValue) => prevValue + 1);
    }
    const result = await gitHubStore.getOrganizationReposList({
      organizationName: enteredText,
      perPage: 20,
      page: page,
    });
    setIsLoading(false);
    if (result.success && result.data.length !== 0)
      setRepoList((prevList) => prevList.concat(result.data));
    else setHasMore(false);
  };

  const gitHubStore = new GitHubStore();

  React.useEffect(() => {
    getOrgReposList(false);
  }, []);

  const onChange = setEnteredText;

  const history = useHistory();

  const closeRepoBranchesDrawer = () => {
    history.push('/repos');
  };

  const buttonClick = (e: React.MouseEvent) => {
    setRepoList([]);
    getOrgReposList(false);
  };

  const getReposListMore = async () => {
    getOrgReposList(true);
  };

  return (
    <Provider value={{ repoList, isLoading }}>
      <RepoBranchesDrawer
        organization={enteredText}
        onClose={closeRepoBranchesDrawer}
        gitHubStore={gitHubStore}
      />
      <div className={styles.container}>
        <div className={styles['search-bar']}>
          <Input value={enteredText} onChange={onChange} />
          <Button onClick={buttonClick} disabled={isLoading}>
            <SearchIcon className={styles['search-icon']} />
          </Button>
        </div>

        <InfiniteScroll
          dataLength={repoList.length}
          next={getReposListMore}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p className={styles['end-message']}>
              <b>You have seen it all</b>
            </p>
          }
        >
          <div className={styles['repos-list']}>
            {repoList.map((it) => (
              <RepoTile key={it.id} item={it} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </Provider>
  );
};

export default ReposSearchPage;
