import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// React Native y extras
import { View, Dimensions, TouchableOpacity, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

// Material
import { Appbar, Avatar } from 'react-native-paper';

// Estilos de mapa
import { grayStyle } from '../assets/map-styles';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();

      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});

        console.log(location);
        setLocation(location);
      }
    })();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Hoy Pasa" />
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Avatar.Image
            source={{
              uri: 'https://api.adorable.io/avatars/60/abott@adorable.png',
            }}
            size={24}
          />
        </TouchableOpacity>
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MapView
          customMapStyle={grayStyle}
          provider="google"
          zoom={12}
          initialRegion={{
            latitude: 17.0634,
            longitude: -96.6994,
            latitudeDelta: 2,
            longitudeDelta: 2,
          }}
          style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height - StatusBar.currentHeight,
          }}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          )}
        </MapView>
      </View>
    </>
  );
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({ goBack: PropTypes.func }),
};

export default HomeScreen;
