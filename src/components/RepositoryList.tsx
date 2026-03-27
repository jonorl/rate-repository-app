import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import RepositoryItem from './respositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState, useCallback } from 'react';
import SortMenu from './SortMenu';
import RepoSearchbar from './RepoSearchbar';
import { useNavigate } from 'react-router-native'; //

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface Repository {
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

interface Edge {
  node: Repository;
}

interface RepositoryData {
  edges: Edge[];
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const navigate = useNavigate();

  const { repositories }: { repositories: RepositoryData | undefined } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearch
  ) as { repositories: RepositoryData | undefined };

  const handleDebouncedChange = useCallback((text: string) => {
    setDebouncedSearch(text);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    if (value === 'LATEST') {
      setOrderBy('CREATED_AT');
      setOrderDirection('DESC');
    } else if (value === 'HIGHEST_RATED') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('DESC');
    } else if (value === 'LOWEST_RATED') {
      setOrderBy('RATING_AVERAGE');
      setOrderDirection('ASC');
    }
  }, []);

  const repositoryNodes = repositories?.edges
    ? repositories.edges.map((edge: Edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <>
          <RepoSearchbar onDebouncedChange={handleDebouncedChange} />
          <SortMenu onSortChange={handleSortChange} />
        </>
      }
      ListEmptyComponent={
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      }
      renderItem={({ item }) => (
        <Pressable style={{ width: '100%' }} onPress={() => navigate(`/repositories/${item.id}`)}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;