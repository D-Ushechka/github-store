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
  const [ChosenRepo, setChosenRepo] = useState<null | RepoItem>(null);

  const getOrgReposList = async (gitHubStore: GitHubStore) => {
    const result = await gitHubStore.getOrganizationReposList({
      organizationName: enteredText,
    });
    result.success ? setRepoList(result.data) : setRepoList([]);
  };

  const gitHubStore = new GitHubStore();

  React.useEffect(() => {
    getOrgReposList(gitHubStore);
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredText(event.target.value);
  };

  const closeRepoBranchesDrawer = () => {
    setChosenRepo(null);
  };

  const buttonClick = (e: React.MouseEvent) => {
    setIsLoading(true);
    getOrgReposList(gitHubStore);
    return setIsLoading(false);
  };

  return (
    <div className="container">
      <RepoBranchesDrawer
        selectedRepo={ChosenRepo}
        onClose={closeRepoBranchesDrawer}
        gitHubStore={gitHubStore}
      />
      <div className="search-bar">
        <Input value={enteredText} onChange={onChange} />
        <Button onClick={buttonClick} disabled={isLoading}>
          <SearchIcon />
        </Button>
      </div>
      <div className="repos-list">
        {repoList.map((it) => (
          <RepoTile
            key={it.id}
            item={it}
            onClick={(e) => {
              setChosenRepo(it);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReposSearchPage;
