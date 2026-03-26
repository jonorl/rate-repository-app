import { useParams } from 'react-router-native';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './respositoryItem';
import ReviewList from './ReviewList'

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

const SingleRepository = () => {
  const { id } = useParams<{ id: string }>();
  const { repository, loading } = useRepository(id!);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!repository) {
    return (
      <View style={styles.container}>
        <Text>Repository not found</Text>
      </View>
    );
  }
  if (id) {
    return (
      <View style={styles.container}>
        <RepositoryItem item={repository} showGithubButton />
        <ReviewList id={id} />
      </View>
    );
  };
}

export default SingleRepository;