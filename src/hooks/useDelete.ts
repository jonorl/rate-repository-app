import { useMutation } from "@apollo/client/react";
import { DELETE_REVIEW } from '../graphql/mutations';
import { ME } from '../graphql/queries'

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW, {
        refetchQueries: [
            {
                query: ME,
                variables: { includeReviews: true }
            }
        ],
    });

    const deleteReview = async (id: string) => {
        const { data } = await mutate({
            variables: {
                id,
            }
        });
        return data;
    };
    return [deleteReview, result] as const;
};

export default useDeleteReview;