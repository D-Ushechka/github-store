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

  const handleClick = () => {
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

  return (
    <div className="container">
      <div className="search-bar">
        <Input
          value={enteredText}
          placeholder="Введите название организации"
          onChange={onChange}
        />
        <Button onClick={handleClick} disabled={isLoading}>
          <SearchIcon />
        </Button>
      </div>
      <div className="repos-list">
        {repoList.map((it) => (
          <RepoTile key={it.id} item={it} />
        ))}
      </div>
    </div>
  );
};

export default ReposSearchPage;
