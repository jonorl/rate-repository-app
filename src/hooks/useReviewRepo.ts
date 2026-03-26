import { useMutation } from "@apollo/client/react";
import { CREATE_REVIEW } from '../graphql/mutations';

interface reviewForm {
    username: String
    repoName: String
    rating: number
    review?: String
}

const ReviewRepo = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);

    const review = async ({ username, repoName, rating, review }: reviewForm) => {
        const { data } = await mutate({
            variables: {
                review: {
                    ownerName: username,
                    repositoryName: repoName,
                    rating: Number(rating),
                    text: review
                }

            }, fetchPolicy: 'no-cache'
        });
        return data;
    };
    return [review, result];
};

export default ReviewRepo;