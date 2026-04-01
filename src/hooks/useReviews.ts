import { useQuery } from '@apollo/client/react';
import { GET_REVIEWS } from '../graphql/queries';
import { NetworkStatus } from '@apollo/client'; 
import { useRef } from 'react'

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
      pageInfo: PageInfo;
    };
  };
}

interface PageInfo {
  endCursor: string;
  startCursor: string;
  hasNextPage: boolean;
}

const useReviews = (id: string) => {
  const { data, loading, error, fetchMore, networkStatus } = useQuery<RepositoryData>(GET_REVIEWS, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const isFetchingMore = useRef(false);

  const handleFetchMore = () => {
  const canFetchMore =
    !isFetchingMore.current &&
    networkStatus !== NetworkStatus.fetchMore &&
    data?.repository.reviews.pageInfo.hasNextPage;

  if (!canFetchMore) return;

  isFetchingMore.current = true;
  fetchMore({
    variables: {
      after: data.repository.reviews.pageInfo.endCursor,
      id,
    },
  }).finally(() => {
    isFetchingMore.current = false;
  });
};

  return { review: data?.repository, loading, error, fetchMore: handleFetchMore, };
};

export default useReviews;