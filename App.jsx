import React, { useMemo, useReducer, useEffect } from 'react';

// React Native
import { AsyncStorage } from 'react-native';

// Material
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/home-screen';
import ProfileScreen from './src/screens/profile-screen';
import WelcomeScreen from './src/screens/welcome-screen';
import SplashScreen from './src/screens/splash-screen';
import LoginScreen from './src/screens/login-screen';
import SignupScreen from './src/screens/signup-screen';

// Auth
import authReducer from './src/reducers/auth-reducer';
import AuthContext from './src/contexts/auth-context';

// Axios client
import client from './src/config/client';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
  },
};

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = useReducer(authReducer, {
    isLoading: true,
    isSignout: false,
    userToken: null,
  });

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken = await AsyncStorage.getItem('@userToken');

      if (userToken) console.log(error);

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  // Usamos useMemo para memorizar el login
  const authContext = useMemo(
    () => ({
      login: async ({ emailAddress, password }) => {
        try {
          const { data } = await client({
            method: 'POST',
            url: '/users/login',
            data: { emailAddress, password },
          });

          dispatch({ type: 'LOGIN', token: data.token });
        } catch (error) {
          console.log('Hubo un error');
        }
      },
      logout: () => dispatch({ type: 'LOGOUT' }),
      signUp: async ({ emailAddress, password, passwordConfirmation }) => {
        try {
          const { data } = await client({
            method: 'POST',
            url: '/users/signup',
            data: {
              emailAddress,
              password,
              passwordConfirmation,
            },
          });
          dispatch({ type: 'LOGIN', token: data.token });
        } catch (error) {
          console.log('Hubo un error');
        }
      },
    }),
    [],
  );

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="home" headerMode="none">
            {state.isLoading ? (
              <Stack.Screen name="splash" component={SplashScreen} />
            ) : state.userToken === null ? (
              <>
                <Stack.Screen
                  name="welcome"
                  component={WelcomeScreen}
                  options={{
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen name="login" component={LoginScreen} />
                <Stack.Screen name="signup" component={SignupScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="home" component={HomeScreen} />
                <Stack.Screen name="profile" component={ProfileScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
};

export { AuthContext };
export default App;
