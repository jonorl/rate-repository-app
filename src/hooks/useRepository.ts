// hooks/useRepository.ts
import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries'; // your query file

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
  repository: RepositoryNode;
}

const useRepository = (id: string) => {
  const { data, loading, error } = useQuery<RepositoryEdge>(GET_REPOSITORY, {
    variables: { id },
  });

  return { repository: data?.repository, loading, error };
};

export default useRepository;