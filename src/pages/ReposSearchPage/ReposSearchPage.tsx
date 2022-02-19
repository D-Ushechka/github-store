import { useState } from 'react';
import React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoBranchesDrawer from '@components/RepoBranchesDrawer';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import './ReposSearchPage.css';
import GitHubStore from '@store/GitHubStore/GitHubStore';
import { RepoItem } from '@store/GitHubStore/types';

const ReposSearchPage = () => {
  const [enteredText, setEnteredText] = useState('ktsstudio');
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState<RepoItem[]>([]);
  const [indexChosenRepo, setIndexChosenRepo] = useState<null | number>(null);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredText(event.target.value);
  };

  React.useEffect(() => {
    const gitHubStore = new GitHubStore();
    gitHubStore
      .getOrganizationReposList({
        organizationName: enteredText,
      })
      .then((result) => {
        if (result.success) {
          setRepoList(result.data);
        } else setRepoList([]);
      });
  }, []);

  const closeRepoBranchesDrawer = (e: React.MouseEvent) => {
    setIndexChosenRepo(null);
  };

  const buttonClick = (e: React.MouseEvent) => {
    setIsLoading(true);
    const gitHubStore = new GitHubStore();
    gitHubStore
      .getOrganizationReposList({
        organizationName: enteredText,
      })
      .then((result) => {
        if (result.success) {
          setRepoList(result.data);
        } else setRepoList([]);
      });
    return setIsLoading(false);
  };

  const setRepoBranchesDrawer = () => {
    if (indexChosenRepo !== null)
      return (
        <RepoBranchesDrawer
          selectedRepo={repoList[indexChosenRepo]}
          onClose={closeRepoBranchesDrawer}
        />
      );
  };

  return (
    <div className="container">
      {setRepoBranchesDrawer()}

      <div className="search-bar">
        <Input
          value={enteredText}
          placeholder="Введите название организации"
          onChange={onChange}
        />
        <Button onClick={buttonClick} disabled={isLoading}>
          <SearchIcon />
        </Button>
      </div>
      <div className="repos-list">
        {repoList.map((it, index) => (
          <RepoTile
            key={it.id}
            item={it}
            onClick={(e) => {
              setIndexChosenRepo(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReposSearchPage;
