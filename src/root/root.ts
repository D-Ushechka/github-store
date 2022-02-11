import GitHubStore from 'store/GitHubStore/GitHubStore';

export function func() {
const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.getOrganizationReposList({
  organizationName: EXAMPLE_ORGANIZATION
}).then(result => {

  if (result.success) {
    console.log(result.data.map( item => item.name ))
  }

  console.log(result); 
})

gitHubStore.postUserRepo({
  userToken: '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',
  repoName: 'test123',
  repoDescription: 'bla bla',
  repoPrivate: false
}).then(result => console.log(result))
}