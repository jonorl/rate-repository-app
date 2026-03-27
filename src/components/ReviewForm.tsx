import { useState } from 'react';
import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import ReviewRepo from '../hooks/useReviewRepo';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: 'white',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputError: {
        borderWidth: 1,
        borderColor: '#d73a4a',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#0366d6',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorText: {
        color: '#d73a4a',
        fontWeight: 'bold',
        alignItems: 'center',
        marginBottom: 10,
    }
});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Repo owner name is required'),
    repoName: yup
        .string()
        .required('Repo name is required'),
    rating: yup
        .number()
        .typeError('Rating must be a number')
        .min(0, 'Minumum number is 0')
        .max(100, 'Max number is 100')
        .required('Rating is required'),
    review: yup
        .string()
});

export const ReviewContainer = ({ onSubmit, submitError }: {
    onSubmit: (values: { username: string; repoName: string; rating: string; review?: string }) => void;
    submitError: string | null;
}) => {
    const formik = useFormik({
        initialValues: {
            username: '',
            repoName: '',
            rating: '',
            review: '',
        },
        onSubmit,
        validationSchema,
    });

    return (
        <View style={styles.container}>
            <Text>Username</Text>
            <TextInput
                testID="usernameField"
                style={formik.touched.username && formik.errors.username ? styles.inputError : styles.input}
                placeholder="Repo owner name"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={styles.errorText}>{formik.errors.username}</Text>
            )}

            <Text>Repository Name</Text>
            <TextInput
                testID="repoName"
                style={formik.touched.repoName && formik.errors.repoName ? styles.inputError : styles.input}
                placeholder="Repo Name"
                value={formik.values.repoName}
                onChangeText={formik.handleChange('repoName')}
            />
            {formik.touched.repoName && formik.errors.repoName && (
                <Text style={styles.errorText}>{formik.errors.repoName}</Text>
            )}

            <Text>Rating (0 to 100)</Text>
            <TextInput
                testID="rating"
                style={formik.touched.rating && formik.errors.rating ? styles.inputError : styles.input}
                placeholder="Rating"
                onChangeText={formik.handleChange('rating')}
                keyboardType="numeric"
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={styles.errorText}>{formik.errors.rating}</Text>
            )}

            <Text>Review (optional)</Text>
            <TextInput
                testID="review"
                style={formik.touched.review && formik.errors.review ? styles.inputError : styles.input}
                placeholder="Review"
                value={formik.values.review}
                onChangeText={formik.handleChange('review')}
            />
            {formik.touched.review && formik.errors.review && (
                <Text style={styles.errorText}>{formik.errors.review}</Text>
            )}

            {submitError && (
                <Text style={styles.errorText}>{submitError}</Text>
            )}

            <Pressable testID="submitButton" style={styles.button} onPress={() => formik.handleSubmit()}>
                <Text style={styles.buttonText}>Review repo</Text>
            </Pressable>
        </View>
    );
};

const submitReview = () => {
    const [review] = ReviewRepo() as any;
    const navigate = useNavigate();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit = async (values: { username: string; repoName: string; rating: string; review?: string }) => {
        setSubmitError(null);
        try {
            const data = await review({
                username: values.username,
                repoName: values.repoName,
                rating: parseInt(values.rating, 10),
                review: values.review,
            });

            if (data?.createReview) {
                navigate(`/repositories/${data.createReview.repositoryId}`);
            }
        } catch (e: any) {
            setSubmitError(e.message ?? 'Something went wrong. Please try again.');
        }
    };

    return <ReviewContainer onSubmit={onSubmit} submitError={submitError} />;
};

export default submitReview;