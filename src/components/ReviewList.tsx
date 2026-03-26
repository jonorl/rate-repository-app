import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import ReviewItem from './ReviewItem';
import useReviews from '../hooks/useReviews';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

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

export const RepositoryListContainer = ({ repositories }: { repositories: RepositoryData }) => {
  const reviews = repositories.repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
    />
  );
};

const RepositoryList = ({ id }: { id: string }) => {
  const { review, loading } = useReviews(id); 
  if (loading || !review) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RepositoryListContainer repositories={{ repository: review }} />
  )
};

export default RepositoryList;

