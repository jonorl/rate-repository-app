import { useQuery } from "@apollo/client/react";
import { REPOSITORIES } from '../graphql/queries';
import { NetworkStatus } from "@apollo/client";

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
    pageInfo: PageInfo;
  };
}

interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
}

const useRepositories = (orderBy: string, orderDirection: String, searchKeyword: String) => {
  const variables = { orderBy, orderDirection, searchKeyword };
  const { data, loading, refetch, fetchMore } = useQuery<GetRepositoriesData>(REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return { 
    repositories: data?.repositories, 
    fetchMore: handleFetchMore,
    loading, 
    refetch 
  };
};

export default useRepositories;