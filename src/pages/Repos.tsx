import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

type Repos = {
  full_name: string;
  description: string;
};

export function Repos() {
  // lib react-query
  const { data: repositories, isFetching } = useQuery<Repos[]>(
    "repos",
    async () => {
      const response = await axios.get(
        "https://api.github.com/users/markus-del/repos"
      );
      return response.data;
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 minutes
    }
  );

  // custom hook for data fetching
  // const { data: repositories, isFetching, error } = useFetch<Repos[]>(
  //   "https://api.github.com/users/markus-del/repos"
  // );

  return (
    <ul>
      {isFetching && <p>Carregando ...</p>}
      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <Link to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
