import { useState } from 'react';

import Avatar from '@components/Avatar';
import Button from '@components/Button';
import Input from '@components/Input';
import RepoTile from '@components/RepoTile';
import SearchIcon from '@components/SearchIcon';
import StarIcon from '@components/StarIcon';
import './ReposSearchPage.css';
import GitHubStore from '@store/GitHubStore/GitHubStore';

const ReposSearchPage = () => {
  const [enteredText, setEnteredText] = useState('ktsstudio');
  const [isLoading, setIsLoading] = useState(false);
  const [repoList, setRepoList] = useState([]);

  const getOrganizationReposList = async () => {
    const gitHubStore = new GitHubStore();
    const result = await gitHubStore.getOrganizationReposList({
      organizationName: enteredText,
    });
    if (result.success) {
      return result.data; //.map((item) => item.name);
    }
    return [];
  };

  // eslint-disable-next-line no-console
  console.log(getOrganizationReposList());

  const handleClick = () => alert('Hey-hey!');
  // const handleClick = setRepoList();

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
        <RepoTile
          item={{
            repoName: 'repo-name-kts',
            orgName: 'ktsstudio',
            star: 123,
            date: '21 Jul 2021',
          }}
        />
        <RepoTile
          item={{
            repoName: 'repo-name-kts',
            orgName: 'ktsstudio',
            star: 123,
            date: '21 Jul 2021',
          }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default ReposSearchPage;
