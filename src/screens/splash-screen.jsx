import React from 'react';

// React Native
import { View } from 'react-native';

// Material
import { ActivityIndicator, Paragraph } from 'react-native-paper';

const SplashScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="lightgreen" />
    <Paragraph style={{ marginTop: 15, color: 'gray' }}>Cargando...</Paragraph>
  </View>
);

export default SplashScreen;
