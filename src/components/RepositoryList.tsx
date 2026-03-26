import { FlatList, View, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import RepositoryItem from './respositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useState } from 'react';
import SortMenu from './SortMenu'
import RepoSearchbar from './RepoSearchbar';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

interface Repository {
  id: string;
  fullName: string;
  description: string,
  language: string,
  forksCount: number,
  stargazersCount: number,
  ratingAverage: number,
  reviewCount: number,
  ownerAvatarUrl: string
}

interface Edge {
  node: Repository;
}

interface RepositoryData {
  edges: Edge[];
}

interface RepositoryListContainerProps {
  repositories: RepositoryData;
  onSortChange: (value: string) => void;
  searchQuery: string;               // Add this
  setSearchQuery: (value: string) => void; // Add this
}

export const RepositoryListContainer = ({
  repositories,
  onSortChange,
  searchQuery,     // 1. Get these from the Container's props
  setSearchQuery,
}: RepositoryListContainerProps) => { // Using the interface we created earlier
  
  const repositoryNodes = repositories?.edges
    ? repositories.edges.map((edge: Edge) => edge.node)
    : [];

  return (
    <>
      {/* 2. Pass them into the Searchbar component */}
      <RepoSearchbar 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />
      
      <SortMenu onSortChange={onSortChange} />
      
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable style={{ width: '100%' }} onPress={() => console.log(item.id)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
        keyExtractor={item => item.id}
      />
    </>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500);
  const { repositories }: { repositories: RepositoryData | undefined } = useRepositories(
    orderBy,
    orderDirection,
    debouncedSearch
  ) as { repositories: RepositoryData | undefined };
  if (!repositories) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onSortChange={(value) => {
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
      }}
    />
  )
};

export default RepositoryList;

