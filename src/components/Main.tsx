import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RepositoryList from './RepositoryList';
import SingleComponent from './SingleComponent';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Review from './ReviewForm'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",
  },
});

const Main = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View  style={styles.container}>
          <AppBar />
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/repositories/:id" element={<SingleComponent />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/review" element={<Review />} />
            <Route path="/myreviews" element={<MyReviews />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Main;