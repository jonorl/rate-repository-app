import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import ReviewItem from './ReviewItem';
import useReviews from '../hooks/useReviews';
import { useMemo } from 'react';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = ({ id }: { id: string }) => {
  const { review, loading, fetchMore } = useReviews(id);

  const onEndReach = () => {
    fetchMore();
    console.log('You have reached the end of the list');
  };

  const reviews = useMemo(
    () => review?.reviews.edges.map(edge => edge.node) ?? [],
    [review?.reviews.edges.length]
  );

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
    />
  );
};

export default RepositoryList;