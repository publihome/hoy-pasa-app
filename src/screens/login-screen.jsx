import React from 'react';

// React Native
import { View } from 'react-native';

// Material
import { Text, Appbar, Paragraph } from 'react-native-paper';

// Componentes personalizados
import LoginForm from '../components/forms/login-form';

const LoginScreen = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Inicia sesión" />
      </Appbar.Header>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 50, marginTop: 20, textAlign: 'left' }}>
          ¡Bienvenido!
        </Text>

        <Paragraph>Inicia sesión para continuar</Paragraph>
      </View>
      <View style={{ flex: 4 }}>
        <LoginForm />
      </View>
    </>
  );
};

export default LoginScreen;
