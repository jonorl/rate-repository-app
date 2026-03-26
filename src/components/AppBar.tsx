import { View, StyleSheet, Text, ScrollView, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import { useApolloClient } from "@apollo/client/react";
import { useQuery } from "@apollo/client/react";
import { ME } from '../graphql/queries';
import Constants from 'expo-constants';
import useAuthStorage from '../hooks/useAuthStorage';
import Fonts from './Fonts';

// Define what 'me' looks like for TypeScript
interface MeData {
  me: {
    id: string;
    username: string;
  } | null;
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  titleText: {
    fontSize: 20,
    fontFamily: Fonts.main,
    color: 'white',
    fontWeight: 'bold',
    padding: 15,
  },
});

const AppBar = () => {
  const { data } = useQuery<MeData>(ME);
  const authStorage = useAuthStorage();

  // FIX: Execute the hook to get the client instance
  const apolloClient = useApolloClient();

  const navigate = useNavigate();
  const authorizedUser = data?.me;

  const onSignOut = async () => {
    if (authStorage) {
      // Clear the token from storage
      await authStorage.removeAccessToken();

      // Clear Apollo cache and re-execute active queries
      await apolloClient.resetStore();

      navigate('/');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.container}>
        <Link to="/">
          <Text style={styles.titleText}>Repositories</Text>
        </Link>

        {authorizedUser ? (
          <>
            <Link to="/review">
              <Text style={styles.titleText}>Review</Text>
            </Link>
            <Pressable onPress={onSignOut}>
              <Text style={styles.titleText}>Sign Out</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Text style={styles.titleText}>Sign In</Text>
            </Link>
            <Link to="/signup">
              <Text style={styles.titleText}>Sign Up</Text>
            </Link>
          </>
        )}

      </ScrollView>
    </View>
  );
};

export default AppBar;