import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from '../graphql/queries';

interface RepositoryNode {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
}

interface RepositoryEdge {
  node: RepositoryNode;
}

interface GetRepositoriesData {
  repositories: {
    edges: RepositoryEdge[];
  };
}

const useRepositories = (orderBy: string, orderDirection: String, searchKeyword: String) => {
  // useQuery handles the fetching, loading state, and refetching automatically
  const { data, loading, refetch } = useQuery<GetRepositoriesData>(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection, searchKeyword },
  });

  // Extract the repositories from the data object
  const repositories = data ? data.repositories : undefined;

  return { 
    repositories: data?.repositories, 
    loading, 
    refetch 
  };
};

export default useRepositories;