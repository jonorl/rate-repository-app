import { Text, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
}

interface RepositoryItemProps {
  item: Repositories;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 20,
  },
  contentContainer: {
    flexShrink: 1, // Prevents text from pushing off screen
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
    color: 'white',
    alignSelf: 'flex-start', // Only takes up needed width
    padding: 4,
    borderRadius: 4,
    overflow: 'hidden',
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
});

// Helper to format large numbers (e.g., 1500 -> 1.5k)
const formatCount = (count: number) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
};

const RepositoryItem = ({ item }: { item: any }) => (
  <SafeAreaProvider style={styles.container}>
    {/* Top Section: Avatar and Header Info */}
    <SafeAreaProvider style={styles.topContainer}>
      <Image style={styles.logo} source={{ uri: item.ownerAvatarUrl }} />
      <SafeAreaProvider style={styles.contentContainer}>
        <Text style={styles.nameText}>{item.fullName}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
        <Text style={styles.languageBadge}>{item.language}</Text>
      </SafeAreaProvider>
    </SafeAreaProvider>

    {/* Bottom Section: Stats */}
    <SafeAreaProvider style={styles.statsContainer}>
      <StatColumn label="Stars" value={formatCount(item.stargazersCount)} />
      <StatColumn label="Forks" value={formatCount(item.forksCount)} />
      <StatColumn label="Reviews" value={item.reviewCount} />
      <StatColumn label="Rating" value={item.ratingAverage} />
    </SafeAreaProvider>
  </SafeAreaProvider>
);

const StatColumn = ({ label, value }: { label: string; value: string | number }) => (
  <SafeAreaProvider style={styles.statItem}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </SafeAreaProvider>
)

export default RepositoryItem;