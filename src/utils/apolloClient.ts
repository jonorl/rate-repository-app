import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { SetContextLink } from "@apollo/client/link/context";
import Constants from 'expo-constants';
import AuthStorage from './authStorage';
import { relayStylePagination } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: Constants.expoConfig?.extra?.apolloUri,
  fetchOptions: {
    signal: undefined, // Disable automatic AbortController
  },
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        repositories: relayStylePagination(),
      },
    },
    Repository: {
      fields: {
        reviews: relayStylePagination(),
      },
    },
  },
});

const createApolloClient = (authStorage: AuthStorage) => {
  const authLink = new SetContextLink(async (prevContext, operation) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      console.log('STORAGE CHECK ->', accessToken);
      return {
        headers: {
          ...prevContext.headers,
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      };
    } catch (e) {
      console.log(e);
      return {
        headers: prevContext.headers,
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
  });
};

export default createApolloClient;