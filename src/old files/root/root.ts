import GitHubStore from '@store/GitHubStore/GitHubStore';

export function func() {
  const gitHubStore = new GitHubStore();

  const EXAMPLE_ORGANIZATION = 'ktsstudio';

  gitHubStore
    .getOrganizationReposList({
      organizationName: EXAMPLE_ORGANIZATION,
    })
    .then((result) => {
      if (result.success) {
        // eslint-disable-next-line no-console
        console.log(result.data.map((item) => item.name));
      }

      // eslint-disable-next-line no-console
      console.log(result);
    });

  gitHubStore
    .postUserRepo({
      userToken: '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',
      repoName: 'test124',
      repoDescription: 'bla bla',
      repoPrivate: false,
    })
    // eslint-disable-next-line no-console
    .then((result) => console.log(result));
}
