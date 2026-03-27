import { useQuery } from '@apollo/client/react';
import { ME } from '../graphql/queries';

interface ReviewNode {
  id: string;
  userId: string;
  repositoryId: string;
  rating: number;
  createdAt: string;
  text: string;
  repository: {
    fullName: string;
    id: string;
  };
}

interface ReviewEdge {
  node: ReviewNode;
}

interface ReviewConnection {
  edges: ReviewEdge[];
}

interface User {
  id: string;
  username: string;
  reviews?: ReviewConnection; 
}

interface MeData {
  me: User;
}


const useMe = (includeReviews: boolean) => {
    const { data, loading, error } = useQuery<MeData>(ME, {
        variables: { includeReviews: true },
        fetchPolicy: 'cache-and-network',
    }
    );

    return { me: data?.me, loading, error };
};

export default useMe;