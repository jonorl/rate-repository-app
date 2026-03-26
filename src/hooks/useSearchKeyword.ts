import { useQuery } from '@apollo/client/react';
import { SEARCH_KEYWORD } from '../graphql/queries';

// 1. Define the shape of a single Repository
interface Repository {
  id: string;
  fullName: string;
}

// 2. Define the shape of the overall Query result
interface SearchKeywordData {
  repositories: {
    edges: Array<{
      node: Repository;
    }>;
  };
}

// 3. Define the variables interface
interface SearchKeywordVars {
  searchKeyword: string;
}

const useSearchKeyword = (searchKeyword: string) => {
  const { data, loading, error } = useQuery<SearchKeywordData, SearchKeywordVars>(SEARCH_KEYWORD, {
    variables: { searchKeyword: searchKeyword },
    fetchPolicy: 'cache-and-network',
  });

  const repositories = data?.repositories
    ? data.repositories.edges.map((edge: any) => edge.node)
    : [];

  return { repositories, loading, error };
};

export default useSearchKeyword;