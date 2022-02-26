import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repos } from "../App";

export function Repo() {
  const params = useParams();
  const queryClient = useQueryClient();
  const currentRepository = params['*'] as string;

  async function handleChangeRepositoryDescription() {
    // await queryClient.invalidateQueries(['repos']);
    const previousRepos = queryClient.getQueryData<Repos[]>('repos');
    if(previousRepos) {
      const nextRepos = previousRepos.map(repo => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: 'testando' }
        } else {
          return repo;
        }
      });

      queryClient.setQueryData('repos', nextRepos);
    }
  }
 
  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>Alterar descrição</button>
    </div>
  );
}