import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useRouter } from 'expo-router';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp'
import useSignIn from '../hooks/useSignIn'

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#d73a4a',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d73a4a',
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must have at least 5 chars')
    .max(30, 'Username must have no more than 30 chars')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must have 5 chars')
    .max(50, 'Password must have no more than 50 chars')
    .required('Password is required'),
  confirmation: yup
  .string()
  .min(5, 'Password must have 5 chars')
  .max(50, 'Password must have no more than 50 chars')
  .oneOf([yup.ref('password')], 'Passwords must match')
  .required('Password confirmation is required'),
});

export const SignInContainer = ({ onSubmit }: { onSubmit: (values: { username: string; password: string; confirmation: string; }) => void }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmation: '',
    },
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        testID="usernameField"
        style={formik.touched.username && formik.errors.username ? styles.inputError : styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <Text>Password</Text>
      <TextInput
        testID="passwordField"
        style={formik.touched.password && formik.errors.password ? styles.inputError : styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <Text>Password Confirmation</Text>
      <TextInput
        testID="confirmationField"
        style={formik.touched.confirmation && formik.errors.confirmation ? styles.inputError : styles.input}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.confirmation}
        onChangeText={formik.handleChange('confirmation')}
      />
      {formik.touched.confirmation && formik.errors.confirmation && (
        <Text style={styles.errorText}>{formik.errors.confirmation}</Text>
      )}

      <Pressable testID="submitButton" style={styles.button} onPress={() => formik.handleSubmit()}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const router = useRouter();

  const onSubmit = async (values: { username: string; password: string; confirmation: string }) => {
    const { username, password } = values;
    try {
      // 1. Create the user
      await signUp({ username, password });

      // 2. Immediately log them in using the same credentials
      await signIn({ username, password });

      // 3. Redirect to the main view
      router.replace('/');
    } catch (e) {
      console.log('Error during sign-up or sign-in:', e);
    }
  };
  
  return <SignInContainer onSubmit={onSubmit} />;
};


export default SignUp;