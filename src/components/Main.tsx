import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import SignIn from './SignIn';

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
      <SafeAreaView>
        <View  style={styles.container}>
          <AppBar />
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Main;