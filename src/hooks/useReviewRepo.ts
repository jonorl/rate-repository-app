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
        try {
            const { data } = await mutate({
                variables: {
                    review: {
                        ownerName: username,
                        repositoryName: repoName,
                        rating: Number(rating),
                        text: review,
                    },
                },
            });
            return data;
        } catch (e: any) {
            // Apollo fails to parse the malformed GraphQLError from the server,
            // so we extract the message from the raw response manually
            const message =
                e?.networkError?.result?.errors?.[0]?.message  // network-level GraphQL error
                ?? e?.graphQLErrors?.[0]?.message              // standard GraphQL error
                ?? e?.message                                  // fallback JS error
                ?? 'Something went wrong';

            throw new Error(message);
        }
    };

    return [review, result];
};

export default ReviewRepo;