import { FlatList, View, StyleSheet, Text } from 'react-native';
import ReviewItem from './ReviewItem';
import useMe from '../hooks/useMe';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
    const { me, loading } = useMe(true);

    if (loading || !me) {
        return <Text>Loading...</Text>;
    }

    const reviews = me.reviews
        ? me.reviews.edges.map((edge: any) => edge.node)
        : [];

    return (
            <FlatList
                data={reviews}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={item => item.id}
            />
    );
}

export default ReviewList