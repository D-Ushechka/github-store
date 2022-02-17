import { useState } from 'react';
import React from 'react';

import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import './ReposSearchPage.css';
import GitHubStore from '@store/GitHubStore/GitHubStore';
import { RepoItem } from '@store/GitHubStore/types';

const ReposSearchPage = () => {
  const [enteredText, setEnteredText] = useState('ktsstudio');
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState<RepoItem[]>([]);

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

  // eslint-disable-next-line no-console
  // console.log(repoList);

  // const handleClick = () => alert('Hey-hey!');
  const handleClick = () => {
    setEnteredText(enteredText);
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
  };

  return (
    <div className="container">
      <form action="" method="get" className="search-bar">
        <Input
          value={enteredText}
          placeholder="Введите название организации"
          onChange={(e) => setEnteredText(e.target.value)}
        />
        <Button onClick={handleClick} disabled={isLoading}>
          <SearchIcon />
        </Button>
      </form>
      <div className="repos-list">
        {repoList.map((it) => (
          <RepoTile key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
};

export default ReposSearchPage;
