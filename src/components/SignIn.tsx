import { Text, TextInput, Pressable, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

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
    .min(6, 'Username must have at least 6 chars')
    .max(12, 'Username must have no more than 12 chars')
    .required('Username is required'),
  password: yup
    .string()
    .min(8, 'Password must have 8 chars')
    .required('Password is required'),
});

const SignIn = () => {

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
    },
    validationSchema,
  })

  return (
    <>
      <View style={styles.container}>
        <Text>Username</Text>
        <TextInput
          style={ formik.touched.username && formik.errors.username ? styles.inputError : styles.input }
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={ styles.errorText }>{formik.errors.username}</Text>
        )}

        <Text>Password</Text>
        <TextInput
          style={ formik.touched.password && formik.errors.password ? styles.inputError : styles.input }
          placeholder="Password"
          secureTextEntry
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={ styles.errorText }>{formik.errors.password}</Text>
        )}

        <Pressable style={styles.button} onPress={() => formik.handleSubmit()}>
          <Text style={styles.buttonText}>Sign in</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignIn;