import React from 'react';

// React Native
import { View } from 'react-native';

// Material
import { Text, Appbar, Paragraph } from 'react-native-paper';

// Componentes personalizados
import SignupForm from '../components/forms/signup-form';

const SignupScreen = ({ navigation }) => {
  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Regístrate" />
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
          ¡Hola!
        </Text>

        <Paragraph>Añade tus datos para continuar</Paragraph>
      </View>
      <View style={{ flex: 4 }}>
        <SignupForm />
      </View>
    </>
  );
};

export default SignupScreen;
