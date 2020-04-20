import React, {useEffect, useState, useReducer, useMemo} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  HomePage,
  ListPage,
  EmptyPage,
  DetailPage,
  Login,
  SplashScreen,
} from '../pages';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import LoginApi from '../api/LoginApi';

const Stack = createStackNavigator();
export const AuthContext = React.createContext();

const initialState = {
  isLoading: true,
  isSignOut: false,
  userToken: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    case 'SIGN_IN':
      return {
        ...state,
        isSignOut: false,
        userToken: action.token,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isSignOut: true,
        userToken: null,
      };
    case 'ERROR':
      return {
        ...state,
        userToken: 'Something went wrong',
        isLoading: false,
      };
    default:
      return state;
  }
};

const Router = () => {
  const [isSigned, setIsSigned] = useState(null);

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
    } catch (e) {
      // error reading value
    }
    setTimeout(() => {
      {
        dispatch({type: 'RESTORE_TOKEN', token: value});
      }
    }, 3000);
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
          dispatch({type: 'SIGN_IN', token: response.data.access_token});
        } catch (err) {
          console.log(err);
          dispatch({type: 'ERROR'});
        }
      },
      signOut: async () => {
        let deleteToken;

        try {
          deleteToken = await AsyncStorage.setItem('token', '');
        } catch (error) {
          console.log(error);
        }
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    [],
  );

  return (
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
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default Router;
