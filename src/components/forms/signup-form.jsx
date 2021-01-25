import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';

// React Native
import { View } from 'react-native';

// Material
import { TextInput, Button, Paragraph, Subheading } from 'react-native-paper';

// Contextos
import AuthContext from '../../contexts/auth-context';

// Componentes internos
import SocialMediaLogin from '../shared/social-media-login';

const SignupForm = ({ navigation }) => {
  const { signUp } = useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        emailAddress: '',
        password: '',
        passwordConfirmation: '',
      }}
      onSubmit={({ emailAddress, password, passwordConfirmation }) => {
        signUp({ emailAddress, password, passwordConfirmation });
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View
          style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 30 }}
        >
          <TextInput
            mode="outlined"
            placeholder="Escribe tu correo electrónico"
            value={values.emailAddress}
            onBlur={handleBlur('email')}
            onChangeText={handleChange('emailAddress')}
            style={{ marginVertical: 10 }}
          />
          <TextInput
            mode="outlined"
            placeholder="Escribe tu contraseña"
            value={values.password}
            onBlur={handleChange('password')}
            onChangeText={handleChange('password')}
            style={{ marginVertical: 10 }}
            secureTextEntry
          />
          <TextInput
            mode="outlined"
            placeholder="Escribe nuevamente tu contraseña"
            value={values.passwordConfirmation}
            onBlur={handleChange('passwordConfirmation')}
            onChangeText={handleChange('passwordConfirmation')}
            style={{ marginVertical: 10 }}
            secureTextEntry
          />
          <Button
            onPress={handleSubmit}
            style={{
              backgroundColor: '#C3EA21',
              marginTop: 20,
            }}
          >
            <Subheading>Registrarse</Subheading>
          </Button>

          <SocialMediaLogin title="O registráte a través de redes sociales" />
        </View>
      )}
    </Formik>
  );
};

SignupForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default SignupForm;
