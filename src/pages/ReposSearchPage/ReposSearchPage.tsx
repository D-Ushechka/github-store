import { createContext, useContext, useState } from 'react';
import React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoBranchesDrawer from '@components/RepoBranchesDrawer';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import GitHubStore from '@store/GitHubStore/GitHubStore';
import { RepoItem } from '@store/GitHubStore/types';
import { Link, useHistory } from 'react-router-dom';

import styles from './ReposSearchPage.module.scss';

export type ReposContext = {
  repoList: RepoItem[];
  isLoading: boolean;
  getOrgReposList: () => void;
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

  const getOrgReposList = async () => {
    const result = await gitHubStore.getOrganizationReposList({
      organizationName: enteredText,
    });
    result.success ? setRepoList(result.data) : setRepoList([]);
  };

  const gitHubStore = new GitHubStore();

  React.useEffect(() => {
    getOrgReposList();
  }, []);

  const onChange = (value: string) => {
    setEnteredText(value);
  };

  const history = useHistory();

  const closeRepoBranchesDrawer = () => {
    history.push('/repos');
  };

  const buttonClick = (e: React.MouseEvent) => {
    setIsLoading(true);
    getOrgReposList();
    return setIsLoading(false);
  };

  return (
    <Provider value={{ repoList, isLoading, getOrgReposList }}>
      <RepoBranchesDrawer
        organization={enteredText}
        onClose={closeRepoBranchesDrawer}
        gitHubStore={gitHubStore}
      />
      <div className={styles.container}>
        <div className={styles['search-bar']}>
          <Input value={enteredText} onChange={onChange} />
          <Button onClick={buttonClick} disabled={isLoading}>
            <SearchIcon />
          </Button>
        </div>
        <div className={styles['repos-list']}>
          {repoList.map((it) => (
            <Link to={`/repos/${it.name}`}>
              <RepoTile key={it.id} item={it} />{' '}
            </Link>
          ))}
        </div>
      </div>
    </Provider>
  );
};

export default ReposSearchPage;
