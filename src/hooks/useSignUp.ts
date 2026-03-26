import { useMutation } from "@apollo/client/react";
import { CREATE_USER } from '../graphql/mutations';

interface UserInput {
    username: string
    password: string
}

const SignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const review = async ({ username, password }: UserInput) => {
    const { data } = await mutate({
      variables: {
        input: { 
          username, 
          password 
        }
    }, fetchPolicy: 'no-cache'
    });
  return data;
  };
  return [review, result] as const;
};

export default SignUp;