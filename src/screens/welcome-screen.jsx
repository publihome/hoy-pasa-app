import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

// React Native
import { View, Alert, Image } from 'react-native';
import { Button, Text, Paragraph } from 'react-native-paper';

// Expo
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

// Componentes
import SocialMediaLogin from '../components/shared/social-media-login';

// Imágenes
import person from '../assets/images/person.png';

const WelcomeScreen = ({ navigation }) => {
  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync('658655498262799');

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await axios(
          `https://graph.facebook.com/me?access_token=${token}`,
        );

        Alert.alert('Logged in!', `Hi ${JSON.stringify(response.data)}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert('Error', `Facebook Login Error: ${message}`);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { accessToken } = await Google.logInAsync({
        androidClientId:
          '17042503586-d5na8c1befhasjg265us4a8jflviknmt.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const response = await axios(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { authorization: `Bearer ${accessToken}` },
          },
        );

        console.log(response.data);
        Alert.alert('Logged in!', `Hi ${JSON.stringify(response.data)}!`);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 30,
        }}
      >
        <Image source={person} />

        <Text style={{ fontSize: 60, marginTop: 20 }}>¡Hola!</Text>
        <Paragraph style={{ textAlign: 'center', marginTop: 20 }}>
          Bienvenido a Hoy Pasa la aplicación que necesitabas para cuidar el
          medio ambiente.
        </Paragraph>

        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => navigation.navigate('login')}
            style={{
              backgroundColor: '#C3EA21',
              marginHorizontal: 10,
              marginTop: 20,
            }}
          >
            Iniciar sesión
          </Button>
          <Button
            onPress={() => navigation.navigate('signup')}
            style={{
              backgroundColor: 'black',
              marginHorizontal: 10,
              marginTop: 20,
            }}
          >
            Regístrarse
          </Button>
        </View>

        <SocialMediaLogin />
      </View>
    </>
  );
};

WelcomeScreen.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
};

export default WelcomeScreen;
