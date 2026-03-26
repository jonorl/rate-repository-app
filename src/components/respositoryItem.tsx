import { Text, Image, StyleSheet, View, Pressable, Linking } from 'react-native';

type Repositories = {
  id: string;
  fullName: string;
  description: string;
  language: string;
  forksCount: number;
  stargazersCount: number;
  ratingAverage: number;
  reviewCount: number;
  ownerAvatarUrl: string;
  url?: string;
}

interface RepositoryItemProps {
  item: Repositories;
  showGithubButton?: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    alignSelf: 'stretch', 
    flexDirection: 'column',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start', 
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
    flexShrink: 1,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  descriptionText: {
    color: '#586069',
    marginBottom: 8,
  },
  languageBadge: {
    backgroundColor: '#0366d6',
    alignSelf: 'flex-start',
    padding: 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  languageBadgeText: {
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  statLabel: {
    color: '#586069',
  },
  githubButton: {
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 4,
    marginTop: 15,
    alignItems: 'center',
  },
  githubButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

const formatCount = (count: number) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
};

const RepositoryItem = ({ item, showGithubButton = false }: RepositoryItemProps) => {
  console.log('ITEM DATA:', JSON.stringify(item));  // ← LOG IS HERE

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
        <View style={styles.contentContainer}>
          <Text style={styles.nameText}>{item.fullName}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <View style={styles.languageBadge}>
            <Text style={styles.languageBadgeText}>{item.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatColumn label="Stars" value={formatCount(item.stargazersCount)} />
        <StatColumn label="Forks" value={formatCount(item.forksCount)} />
        <StatColumn label="Reviews" value={item.reviewCount} />
        <StatColumn label="Rating" value={item.ratingAverage} />
      </View>

      {showGithubButton && item.url && (
        <Pressable
          style={styles.githubButton}
          onPress={() => Linking.openURL(item.url!)}
        >
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

const StatColumn = ({ label, value }: { label: string; value: string | number }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default RepositoryItem;