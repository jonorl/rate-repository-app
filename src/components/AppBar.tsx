import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Fonts from './Fonts';

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
  scrollContainer: {
    flexDirection: 'row', 
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.container} >
          <Link to="/">
            <Text style={styles.titleText}>Repositories</Text>
          </Link>
          <Link to="/signin">
            <Text style={styles.titleText}>Sign In</Text>
          </Link>
    </ScrollView>
  </View>
  )
};

export default AppBar;