import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import { View, Alert } from 'react-native';
import { TouchableRipple, Paragraph } from 'react-native-paper';

// Expo
import { FontAwesome } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

// Cliente de axios para realizar peticiones http
import client from '../../config/client';

const SocialMediaLogin = ({ top, title, navigation }) => {
  const loginWithFacebook = async () => {
    try {
      await Facebook.initializeAsync('1539082349585318');

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email', 'link'],
      });

      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        try {
          const response = await axios(
            `https://graph.facebook.com/me?access_token=${token}`,
          );

          const authFacebookResponse = await client.post('/auth/facebook', {
            data: {
              email: response.data?.email || '',
              username: response.data?.username || '',
              id: response.data.id,
            },
          });

          Alert.alert('TOKEN', authFacebookResponse.data.token);
          // navigation.navigate('home');
        } catch (error) {
          Alert.alert('Hubo un error al procesar la solicitud', error);
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      Alert.alert('Error', `Facebook Login Error: ${message}`);
    }
  };

  // eslint-disable-next-line
  const loginWithGoogle = async () => {
    try {
      const { accessToken, type } = await Google.logInAsync({
        androidClientId:
          '17042503586-d5na8c1befhasjg265us4a8jflviknmt.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (type === 'success') {
        const response = await axios(
          'https://www.googleapis.com/userinfo/v2/me',
          {
            headers: { authorization: `Bearer ${accessToken}` },
          },
        );

        Alert.alert('Logged in!', `Hi ${JSON.stringify(response.data)}!`);
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  return (
    <View style={{ marginTop: top }}>
      <View>
        <Paragraph style={{ textAlign: 'center' }}>{title}</Paragraph>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableRipple onPress={loginWithFacebook}>
          <FontAwesome
            name="facebook-square"
            size={30}
            style={{ margin: 10 }}
          />
        </TouchableRipple>
        <TouchableRipple onPress={loginWithGoogle}>
          <FontAwesome name="google" size={30} style={{ margin: 10 }} />
        </TouchableRipple>
      </View>
    </View>
  );
};

SocialMediaLogin.defaultProps = {
  top: 40,
  title: 'O inicia sesión a través de redes sociales',
};

SocialMediaLogin.propTypes = {
  top: PropTypes.number,
  title: PropTypes.string,
  navigation: PropTypes.shape({ navigate: PropTypes.func }),
};

export default SocialMediaLogin;
