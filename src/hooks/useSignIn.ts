import { useMutation, useApolloClient } from "@apollo/client/react";
import { GET_ACCESS_TOKEN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

interface AuthenticateResult {
  authenticate: {
    accessToken: string;
  };
}

interface AuthenticateVariables {
  username: string;
  password: string;
}

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation<AuthenticateResult, AuthenticateVariables>(GET_ACCESS_TOKEN);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }: AuthenticateVariables) => {
      const { data } = await mutate({
        variables: { username, password }
      });

      const accessToken = data?.authenticate?.accessToken;

      if (accessToken) {
        await authStorage?.setAccessToken(accessToken);
        await apolloClient.resetStore();
      }

      return data?.authenticate;
  };

  return [signIn, result] as const;
};

export default useSignIn