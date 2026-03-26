import { useQuery } from '@apollo/client/react';
import { GET_REVIEWS } from '../graphql/queries';

interface Review {
  id: string;
  text: string;
  rating: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

interface RepositoryData {
  repository: {
    id: string;
    fullName: string;
    reviews: {
      edges: Array<{ node: Review }>;
    };
  };
}

const useReviews = (id: string) => {
  const { data, loading, error } = useQuery<RepositoryData>(GET_REVIEWS, {
    variables: { id },
  });

  return { review: data?.repository, loading, error };
};

export default useReviews;