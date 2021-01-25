import React from 'react';
import PropTypes from 'prop-types';

// React Native y extras
import { View } from 'react-native';

// Material
import { Appbar, TouchableRipple, Headline } from 'react-native-paper';

const ProfileScreen = ({ navigation }) => (
  <>
    <Appbar.Header>
      <TouchableRipple onPress={() => navigation.goBack()}>
        <Appbar.Action icon="close" />
      </TouchableRipple>
    </Appbar.Header>
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Headline>Nombre de usuario</Headline>
    </View>
  </>
);

ProfileScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func }),
};

export default ProfileScreen;
