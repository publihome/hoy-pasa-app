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

const LoginForm = ({ navigation }) => {
  const { login } = useContext(AuthContext);

  return (
    <Formik
      initialValues={{ emailAddress: '', password: '' }}
      onSubmit={({ emailAddress, password }) => {
        login({ emailAddress, password });
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
          <Button
            onPress={handleSubmit}
            style={{
              backgroundColor: '#C3EA21',
              marginTop: 20,
            }}
          >
            <Subheading>Iniciar sesión</Subheading>
          </Button>
          <View style={{ marginTop: 20 }}>
            <Paragraph
              style={{ textAlign: 'center', color: 'gray' }}
              onPress={() => navigation.navigate('recover-password')}
            >
              ¿Olvidastes la contraseña?
            </Paragraph>
          </View>

          <SocialMediaLogin />
        </View>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }),
};

export default LoginForm;
