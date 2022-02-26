import axios from 'axios';
import { useQuery } from 'react-query';
import { useFetch } from './hooks/useFetch';

type Repos = {
  full_name: string;
  description: string;
}

function App() {
  // const { data: repositories, isFetching, error } = useFetch<Repos[]>(
  //   "https://api.github.com/users/markus-del/repos"
  // );

  const { data: repositories, isFetching } = useQuery<Repos[]>('repos', async () => {
    const response = await axios.get('https://api.github.com/users/markus-del/repos');
    return response.data;
  }, {
    refetchOnWindowFocus: false,
  });

  return (
    <ul>
      {isFetching && <p>Carregando ...</p>}
      {/* {error && <p>{error.message}</p>} */}
      {repositories?.map(repo => {
        return (
          <li key={repo.full_name}>
              <strong>{repo.full_name}</strong>
              <p>{repo.description}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default App;
