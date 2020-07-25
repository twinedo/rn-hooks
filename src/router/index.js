import React, {useEffect, useState, useReducer, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomePage,
  ListPage,
  EmptyPage,
  DetailPage,
  Login,
  SplashScreen,
  MapPage,
} from '../pages';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import LoginApi from '../api/LoginApi';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();
export const DataSignInContext = React.createContext();

const initialState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
        error: action.error,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
        error: action.error,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignOut: true,
        userToken: null,
        error: action.error,
      };
    case 'ERROR':
      return {
        ...state,
        userToken: null,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const Router = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log('ini useEffect');
    CheckSignInStatus();
  }, []);

  const CheckSignInStatus = async () => {
    let value;

    try {
      value = await AsyncStorage.getItem('token');
      console.log(value);
      setTimeout(() => {
        {
          dispatch({type: 'RESTORE_TOKEN', token: value, error: ''});
        }
      }, 3000);
    } catch (e) {
      // error reading value
      dispatch({type: 'ERROR', error: e});
    }
  };

  const authContext = useMemo(
    () => ({
      signIn: async ({username, password}) => {
        let fd = new FormData();
        fd.append('username', username);
        fd.append('password', password);
        fd.append('grant_type', 'password');
        try {
          const response = await LoginApi.post('/user/v1/signin', fd);
          console.log(response);
          await AsyncStorage.setItem(
            'token',
            JSON.stringify(response.data.access_token),
          );
          await AsyncStorage.setItem(
            'user_id',
            JSON.stringify(response.data.user_id),
          );
          await AsyncStorage.setItem(
            'company_id',
            JSON.stringify(response.data.company_id),
          );

          dispatch({
            type: 'SIGN_IN',
            token: response.data.access_token,
            error: '',
          });
        } catch (err) {
          console.log(err);

          dispatch({type: 'ERROR', error: 'Username or Password is incorrect'});
        }
      },
      signOut: async () => {
        let deleteToken;

        try {
          deleteToken = await AsyncStorage.setItem('token', '');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'SIGN_OUT', token: null, error: ''});
      },
    }),
    [],
  );

  // const hasLocationPermissionIOS = async () => {
  //   const openSetting = () => {
  //     Linking.openSettings().catch(() => {
  //       Alert.alert('Unable to open settings');
  //     });
  //   };
  //   const status = await Geolocation.requestAuthorization('whenInUse');

  //   if (status === 'granted') {
  //     return true;
  //   }

  //   if (status === 'denied') {
  //     Alert.alert('Location permission denied');
  //   }

  //   if (status === 'disabled') {
  //     Alert.alert(
  //       `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
  //       '',
  //       [
  //         {text: 'Go to Settings', onPress: openSetting},
  //         {text: "Don't Use Location", onPress: () => {}},
  //       ],
  //     );
  //   }

  //   return false;
  // };
  // const hasLocationPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     const hasPermission = await hasLocationPermissionIOS();
  //     return hasPermission;
  //   }

  //   if (Platform.OS === 'android' && Platform.Version < 23) {
  //     return true;
  //   }

  //   const hasPermission = await PermissionsAndroid.check(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );

  //   if (hasPermission) {
  //     return true;
  //   }

  //   const status = await PermissionsAndroid.request(
  //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //   );

  //   if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //     return true;
  //   }

  //   if (status === PermissionsAndroid.RESULTS.DENIED) {
  //     ToastAndroid.show(
  //       'Location permission denied by user.',
  //       ToastAndroid.LONG,
  //     );
  //   } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //     ToastAndroid.show(
  //       'Location permission revoked by user.',
  //       ToastAndroid.LONG,
  //     );
  //   }

  //   return false;
  // };

  // useEffect(() => {
  //   hasLocationPermission();
  // });

  return (
    <DataSignInContext.Provider value={state}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              <Stack.Screen name="SplashScreen" component={SplashScreen} />
            ) : state.userToken == null ? (
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  title: 'Sign IN',
                  animationTypeForReplace: state.isSignOut ? 'pop' : 'push',
                }}
              />
            ) : (
              <>
                <Stack.Screen
                  name="HomePage"
                  component={HomePage}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="ListPage"
                  component={ListPage}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="EmptyPage" component={EmptyPage} />
                <Stack.Screen name="DetailPage" component={DetailPage} />
                <Stack.Screen name="MapPage" component={MapPage} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </DataSignInContext.Provider>
  );
};

export default Router;
