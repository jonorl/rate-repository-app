import { Text, StyleSheet, View, Pressable, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';
import useDeleteReview from "../hooks/useDelete"

interface ReviewItemProps {
    review: {
        id: string;
        text: string;
        rating: number;
        createdAt: string;
        user?: {
            username: string;
        };
        repository?: {
            fullName: string;
            id: string;
        };
    };
}

const styles = StyleSheet.create({
    ratingContainer: {
        width: 50,
        height: 50,
        borderRadius: 25, // Makes it a perfect circle
        borderWidth: 2,
        borderColor: '#0366d6', // The primary blue color
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        flexShrink: 0, // Prevents the circle from squishing
    },
    ratingText: {
        color: '#0366d6',
        fontWeight: 'bold',
        fontSize: 18,
    },
    usernameText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 2,
    },
    dateText: {
        color: '#586069',
        marginBottom: 10,
    },
    reviewText: {
        fontSize: 15,
        lineHeight: 20,
        color: '#24292e',
    },
    container: {
        backgroundColor: 'white',
        padding: 15,
        alignSelf: 'stretch',
        flexDirection: 'row',
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
    buttonContainer: {
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        gap: 10, // Adds space between the buttons
    },
    button: {
        flex: 1,
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButton: {
        backgroundColor: '#0366d6',
    },
    deleteButton: {
        backgroundColor: '#d73a4a',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

const ReviewItem = ({ review }: ReviewItemProps) => {
    const navigate = useNavigate();
    const [confirmDelete] = useDeleteReview()
    const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

    const viewRepo = (id: string) => {
        navigate(`/repositories/${id}`)
    }
    const deleteReview = (id:string) => {
        Alert.alert('Delete Review', 'Are you sure you want to delete this review?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => {
                confirmDelete(id)
            }
             },
        ]);
    }

    const title = review.user
        ? review.user.username
        : review.repository?.fullName ?? 'Unknown';

    return (
        <>
            <View style={styles.container}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>{review.rating}</Text>
                </View>

                <View style={styles.contentContainer}>
                    <Text style={styles.usernameText}>{title}</Text>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                    <Text style={styles.reviewText}>{review.text}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={[styles.button, styles.viewButton]}
                    onPress={() => { review.repository?.id && viewRepo(review.repository?.id)
                    }}
                >
                    <Text style={styles.buttonText}>View repository</Text>
                </Pressable>

                <Pressable
                    style={[styles.button, styles.deleteButton]}
                    onPress={async () => { deleteReview(review.id)}}
                >
                    <Text style={styles.buttonText}>Delete review</Text>
                </Pressable>
            </View>
        </>
    );
};

export default ReviewItem;